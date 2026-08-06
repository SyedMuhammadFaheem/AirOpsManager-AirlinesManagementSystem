import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsCustomer } from '../../fixtures/auth';
import { seedAdmins, seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

test.describe('session (/auth/me) and logout', () => {
  test('admin logout clears admin_token cookie and returns to /signin', async ({ page }) => {
    // Reuses mohsin (already real-logged-in and cached elsewhere in this run) rather than a
    // fresh admin identity, to stay well under adminLimiter's 5-requests/15min budget across
    // the whole suite — see fixtures/auth.ts for the cookie-cache mechanism. Logout only clears
    // the browser's own cookie; the cached JWT string remains valid for reuse by later tests.
    await loginAsAdmin(page, seedAdmins.mohsin.username, seedAdmins.mohsin.password);
    let cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'admin_token')).toBeTruthy();

    await page.getByRole('button', { name: /logout/i }).click();
    await expect(page).toHaveURL(/\/signin/);

    cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'admin_token')).toBeFalsy();
  });

  test('customer logout clears customer_token cookie and returns to sign-in', async ({ page }) => {
    // Reuses marij (cached from a11y specs) for the same rate-limit-budget reason as above.
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    let cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'customer_token')).toBeTruthy();

    await page.getByRole('button', { name: /logout/i }).first().click();
    await expect(page).toHaveURL(/\/customer-signin|\/$/, { timeout: 5000 });

    cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'customer_token')).toBeFalsy();
  });

  test('GET /auth/me reflects admin session after login', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.mohsin.username, seedAdmins.mohsin.password);
    const res = await page.request.get('http://localhost:5001/auth/me');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.role).toBe('admin');
    expect(body.username).toBe(seedAdmins.mohsin.username);
  });

  test('GET /auth/me reflects customer session after login', async ({ page }) => {
    // Reuses marij for the same rate-limit-budget reason as above.
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    const res = await page.request.get('http://localhost:5001/auth/me');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.role).toBe('customer');
    expect(body.client_id).toBe(seedCustomers.marij.client_id);
  });

  test('GET /auth/me returns 401 with no session', async ({ request }) => {
    const res = await request.get('http://localhost:5001/auth/me');
    expect(res.status()).toBe(401);
  });
});
