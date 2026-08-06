import { test, expect } from '@playwright/test';
import { loginAsCustomer } from '../../fixtures/auth';
import { seedCustomers, seedCustomerPassword, uniqueEmail } from '../../fixtures/test-data';

// CUSTOMER_REVIEW.client_id is the table's PRIMARY KEY (schema.aiven.sql), so every customer can
// submit at most one review. All 10 seeded customers already have a review row from seeds.sql, so
// we sign up a fresh customer via the API to exercise the happy (first-review) path, then reuse a
// seeded customer to exercise the "second submission" edge case against pre-existing data.

async function signupFreshCustomer(request: import('@playwright/test').APIRequestContext) {
  const email = uniqueEmail('review-flow');
  const res = await request.post('http://localhost:5001/auth/signup', {
    data: {
      fname: 'Review', lname: 'Fresh', phone: '+923009998888', email,
      passport: `RF${Date.now()}`, password: 'validPass123',
    },
  });
  expect(res.status()).toBe(201);
  return { email, password: 'validPass123' };
}

test.describe('customer: review flow', () => {
  test('first review submission succeeds and redirects to the customer panel', async ({ page, request }) => {
    const fresh = await signupFreshCustomer(request);
    await loginAsCustomer(page, fresh.email, fresh.password);
    const id = page.url().match(/\/customer-panel\/(\d+)/)![1];

    await page.goto(`/add-review/${id}`);
    await page.locator('textarea').fill('Great flight experience, on time and comfortable.');
    await page.getByRole('button', { name: /submit review/i }).click();
    await expect(page.getByText(/review submitted/i)).toBeVisible();
    await page.getByRole('button', { name: /ok/i }).click();
    await expect(page).toHaveURL(new RegExp(`/customer-panel/${id}`), { timeout: 5000 });
  });

  test('second submission attempt is rejected with a visible, non-crashing error (documents actual behavior)', async ({ page }) => {
    // seeded customer "mohsin" (client_id 1) already has a review row from seeds.sql.
    await loginAsCustomer(page, seedCustomers.mohsin.email, seedCustomerPassword);
    await page.goto(`/add-review/${seedCustomers.mohsin.client_id}`);
    await page.locator('textarea').fill('Trying to submit a second review.');
    await page.getByRole('button', { name: /submit review/i }).click();
    // server/routes/reviews.js maps ER_DUP_ENTRY -> 409 "You have already submitted a review."
    // and AddReviews.js's catch block surfaces err.response.data.message via SweetAlert2 —
    // confirmed non-issue: no raw 500, no silent failure, no crash.
    await expect(page.getByText(/already submitted a review/i)).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`/add-review/${seedCustomers.mohsin.client_id}`));
  });

  test('submitting an empty review is blocked client-side without a network call', async ({ page }) => {
    // Client-side-only assertion, identity doesn't matter — reuses mohsin (cached) to stay
    // under customerLimiter's budget.
    await loginAsCustomer(page, seedCustomers.mohsin.email, seedCustomerPassword);
    let requestFired = false;
    page.on('request', (req) => { if (req.url().includes('/addreview/')) requestFired = true; });
    await page.goto(`/add-review/${seedCustomers.mohsin.client_id}`);
    await page.getByRole('button', { name: /submit review/i }).click();
    await expect(page.getByText(/please write a review/i)).toBeVisible();
    expect(requestFired).toBe(false);
  });
});
