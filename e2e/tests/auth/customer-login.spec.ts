import { test, expect } from '@playwright/test';
import { loginAsCustomer } from '../../fixtures/auth';
import { seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

// NOTE: does not exhaust the 10-attempts/15min customerLimiter — see security/rate-limiting.spec.ts.

test.describe('customer login', () => {
  test('valid credentials redirect to /customer-panel/:id', async ({ page }) => {
    await loginAsCustomer(page, seedCustomers.mohsin.email, seedCustomerPassword);
    await expect(page).toHaveURL(new RegExp(`/customer-panel/${seedCustomers.mohsin.client_id}`));
  });

  test('invalid password shows an error and stays on /customer-signin', async ({ page }) => {
    await page.goto('/customer-signin');
    await page.locator('input[type="email"]').fill(seedCustomers.mohsin.email);
    await page.locator('input[type="password"]').fill('wrong-password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    await expect(page).toHaveURL(/\/customer-signin/);
  });

  test('unknown email shows the same generic error', async ({ page }) => {
    await page.goto('/customer-signin');
    await page.locator('input[type="email"]').fill('nobody@nowhere.example.com');
    await page.locator('input[type="password"]').fill('whatever123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  test('empty required fields block submission client-side', async ({ page }) => {
    await page.goto('/customer-signin');
    let requestFired = false;
    page.on('request', (req) => { if (req.url().includes('/auth/customerlogin')) requestFired = true; });
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForTimeout(300);
    expect(requestFired).toBe(false);
  });

  test('links to signup and admin login are present', async ({ page }) => {
    await page.goto('/customer-signin');
    await expect(page.getByRole('link', { name: /create an account/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /admin login/i })).toBeVisible();
  });
});
