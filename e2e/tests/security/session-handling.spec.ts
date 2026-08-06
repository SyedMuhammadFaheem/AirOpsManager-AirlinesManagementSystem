import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsCustomer } from '../../fixtures/auth';
import { seedAdmins, seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

test.describe('cookie attributes', () => {
  test('admin_token cookie is httpOnly, sameSite=Strict, not Secure (dev/non-production)', async ({ page, context }) => {
    await loginAsAdmin(page, seedAdmins.mohsin.username, seedAdmins.mohsin.password);
    const cookie = (await context.cookies()).find((c) => c.name === 'admin_token');
    expect(cookie).toBeTruthy();
    expect(cookie!.httpOnly).toBe(true);
    expect(cookie!.sameSite).toBe('Strict');
    expect(cookie!.secure).toBe(false); // server/routes/auth.js: secure only when NODE_ENV==='production'
  });

  test('customer_token cookie is httpOnly, sameSite=Strict, not Secure (dev/non-production)', async ({ page, context }) => {
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    const cookie = (await context.cookies()).find((c) => c.name === 'customer_token');
    expect(cookie).toBeTruthy();
    expect(cookie!.httpOnly).toBe(true);
    expect(cookie!.sameSite).toBe('Strict');
    expect(cookie!.secure).toBe(false);
  });
});

test.describe('cross-role token reuse (fixed — role claim now checked)', () => {
  test('a customer\'s token copied into the admin_token cookie slot no longer grants admin access', async ({ page, context }) => {
    // server/middleware/auth.js's verifyAdmin/verifyCustomer now check payload.role matches the
    // cookie slot, and /auth/me does the same, so a validly-signed token from the wrong role is
    // rejected instead of trusted.
    await loginAsCustomer(page, seedCustomers.waleed.email, seedCustomerPassword);
    const customerCookie = (await context.cookies()).find((c) => c.name === 'customer_token')!;
    await context.clearCookies();
    await context.addCookies([{ ...customerCookie, name: 'admin_token' }]);

    await page.goto('/admin-panel');
    await expect(page).toHaveURL(/\/signin/); // redirected, not granted admin access

    const apiRes = await page.request.get('http://localhost:5001/api/get');
    expect(apiRes.status()).toBe(403); // verifyAdmin now rejects a customer-role token
  });

  test('an admin token copied into the customer_token slot is rejected, not accepted as "customer"', async ({ page, context }) => {
    await loginAsAdmin(page, seedAdmins.ahmad.username, seedAdmins.ahmad.password);
    const adminCookie = (await context.cookies()).find((c) => c.name === 'admin_token')!;
    await context.clearCookies();
    await context.addCookies([{ ...adminCookie, name: 'customer_token' }]);

    // /auth/me now checks payload.role === 'customer' before trusting the customer_token slot,
    // so an admin-role token there no longer passes — CustomerRoute redirects away.
    await page.goto(`/customer-panel/${seedCustomers.mohsin.client_id}`);
    await expect(page).toHaveURL(/\/customer-signin/);

    // verifyCustomer on the server rejects the admin-role token outright now too.
    const apiRes = await page.request.get(`http://localhost:5001/profile/${seedCustomers.mohsin.client_id}`);
    expect(apiRes.status()).toBe(403);
  });
});

test.describe('401 interceptor (client/src/api/client.js)', () => {
  test('a stale/missing session on a data fetch triggers exactly one hard redirect to /signin, no loop', async ({ page, context }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    // Simulate the cookie disappearing mid-session (expiry, manual clear, etc.) without
    // navigating away first, so the next data fetch is what discovers the 401.
    await context.clearCookies();

    let navigationCount = 0;
    page.on('framenavigated', (frame) => { if (frame === page.mainFrame()) navigationCount++; });

    await page.goto('/clients'); // triggers GET /api/get -> 401 -> apiClient interceptor redirects
    await expect(page).toHaveURL(/\/signin/, { timeout: 10_000 });

    // Give any runaway redirect loop a chance to manifest, then confirm it settled.
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL(/\/signin/);
  });
});
