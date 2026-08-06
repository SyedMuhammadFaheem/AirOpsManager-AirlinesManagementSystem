import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins } from '../../fixtures/test-data';

// NOTE: This file intentionally never exhausts the 5-attempts/15min admin rate limiter
// (see server/middleware/rateLimiter.js adminLimiter). That behavior is covered in
// security/rate-limiting.spec.ts, which is designed to run after every other admin-login-
// dependent spec (alphabetical folder order: admin, auth, cross-cutting, customer, security,
// validation) so exhausting the limiter there doesn't lock out earlier tests.

test.describe('admin login', () => {
  test('valid credentials redirect to /admin-panel and show admin username', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await expect(page.getByText(new RegExp(seedAdmins.faheem.username, 'i'))).toBeVisible();
  });

  test('invalid credentials show an error and stay on /signin', async ({ page }) => {
    await page.goto('/signin');
    await page.locator('input[type="text"]').fill(seedAdmins.faheem.username);
    await page.locator('input[type="password"]').fill('wrong-password');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Signin.js's catch-all shows a SweetAlert2 dialog with title "Invalid credentials"
    // regardless of the underlying status code (401 vs 429) — see rate-limiting.spec.ts.
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    await expect(page).toHaveURL(/\/signin/);
  });

  test('unknown username shows the same generic error (no username enumeration)', async ({ page }) => {
    await page.goto('/signin');
    await page.locator('input[type="text"]').fill('DoesNotExist');
    await page.locator('input[type="password"]').fill('whatever123');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  test('empty required fields block submission client-side (no network call)', async ({ page }) => {
    await page.goto('/signin');
    let requestFired = false;
    page.on('request', (req) => { if (req.url().includes('/auth/login')) requestFired = true; });
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForTimeout(300);
    expect(requestFired).toBe(false);
    await expect(page).toHaveURL(/\/signin/);
  });

  test('link to customer login is present', async ({ page }) => {
    await page.goto('/signin');
    await page.getByRole('link', { name: /customer login/i }).click();
    await expect(page).toHaveURL(/\/customer-signin/);
  });
});
