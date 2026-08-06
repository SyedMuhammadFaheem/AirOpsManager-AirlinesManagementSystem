import { test, expect } from '@playwright/test';
import { loginAsCustomer } from '../../fixtures/auth';
import { seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

// server/routes/search.js (GET /profile/:id, GET /invoice/:id) and server/routes/bookings.js
// (GET /showPass/:id) all compare req.params.id against req.user.client_id from the JWT and
// return 403 Forbidden on mismatch — the server-side access control is already sound (verified
// by reading the code). The value of these tests is confirming the FRONTEND handles that 403
// gracefully: no crash, no blank screen, and critically no leaked data belonging to the other
// customer.

test.describe('IDOR attempts and 403 UX', () => {
  test.beforeEach(async ({ page }) => {
    // logged in as mohsin (client_id 1); all URLs below target ahmad (client_id 2)'s data.
    await loginAsCustomer(page, seedCustomers.mohsin.email, seedCustomerPassword);
  });

  test('GET /profile/:id for another client_id: page renders without crashing and does not leak the other customer\'s data', async ({ page }) => {
    await page.goto(`/profile/${seedCustomers.ahmad.client_id}`);
    // ViewProfile.js .catch(() => {}) on the 403 leaves `data` at its initial {} — placeholders shown.
    await expect(page.getByText('—').first()).toBeVisible();
    await expect(page.getByText('ahmadaleem@hotmail.com')).toHaveCount(0);
    await expect(page.getByText('AHMAD')).toHaveCount(0);
  });

  test('GET /booking/showPass/:id for another client_id: boarding pass renders without crashing', async ({ page }) => {
    await page.goto(`/boarding-pass/${seedCustomers.ahmad.client_id}`);
    // BoardingPass.js has no .catch on this request, only .finally(() => setLoading(false)) —
    // the unhandled rejection stops the spinner but doesn't crash the component; `data` stays {}.
    await expect(page.getByText('AirOps Manager')).toBeVisible();
    await expect(page.locator('text=—').first()).toBeVisible();
  });

  test('invoice URL crafted for another client_id renders without crashing and shows no passenger data', async ({ page }) => {
    await page.goto(`/invoice/60-${seedCustomers.ahmad.client_id}`);
    // Invoice.js now surfaces a load failure (e.g. this cross-customer 403) as a Swal error —
    // dismiss it before asserting on the page underneath (SweetAlert2 marks the rest aria-hidden
    // while open, so a role-based query for the heading wouldn't find it until it's closed).
    await page.getByRole('button', { name: /ok/i }).click();
    await expect(page.getByRole('heading', { name: /booking summary/i })).toBeVisible();
    await expect(page.getByText('AHMAD')).toHaveCount(0);
  });

  test('POST /reviews/api/addreview/:id for another client_id: server 403 is surfaced as a visible error, not a crash', async ({ page }) => {
    await page.goto(`/add-review/${seedCustomers.ahmad.client_id}`);
    await page.locator('textarea').fill('Attempting to post a review as someone else.');
    await page.getByRole('button', { name: /submit review/i }).click();
    await expect(page.getByText(/forbidden/i)).toBeVisible();
  });
});
