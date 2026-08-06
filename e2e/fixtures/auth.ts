import { Page, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Cookies for the fixed set of identities used across the suite are pre-authenticated once in
// scripts/global-setup.ts and persisted to .auth/*.json — see that file for why an in-memory
// cache doesn't work here (Playwright restarts the worker process between tests, confirmed via
// workerIndex incrementing on every single test in test-results/results.json, which wipes any
// module-level Map before the next test runs). Identities NOT in that pre-authenticated set
// (e.g. a freshly-signed-up customer in review-flow.spec.ts) fall back to a real UI login every
// time, which is fine since those are one-off, non-repeated identities.
const AUTH_DIR = path.resolve(__dirname, '../.auth');

function readCachedCookies(file: string) {
  const p = path.join(AUTH_DIR, file);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
}

/** Logs in as admin — uses the pre-authenticated cookie file if this username was set up in
 * globalSetup, otherwise does a real UI login through /signin. */
export async function loginAsAdmin(page: Page, username: string, password: string) {
  const cached = readCachedCookies(`admin-${username}.json`);
  if (cached) {
    await page.context().addCookies(cached);
    await page.goto('/admin-panel');
    await expect(page).toHaveURL(/\/admin-panel/, { timeout: 10_000 });
    return;
  }

  await page.goto('/signin');
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/admin-panel/, { timeout: 10_000 });
}

/** Logs in as customer — uses the pre-authenticated cookie file if this email was set up in
 * globalSetup, otherwise does a real UI login through /customer-signin. */
export async function loginAsCustomer(page: Page, email: string, password: string) {
  const cached = readCachedCookies(`customer-${email}.json`);
  if (cached) {
    await page.context().addCookies(cached);
    const meRes = await page.request.get('http://localhost:5001/auth/me');
    const me = await meRes.json();
    await page.goto(`/customer-panel/${me.client_id}`);
    await expect(page).toHaveURL(/\/customer-panel\/\d+/, { timeout: 10_000 });
    return;
  }

  await page.goto('/customer-signin');
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/customer-panel\/\d+/, { timeout: 10_000 });
}

/** Extracts the client_id from the current /customer-panel/:id URL after a customer login. */
export function clientIdFromUrl(url: string): string {
  const m = url.match(/\/customer-panel\/(\d+)/);
  if (!m) throw new Error(`Could not extract client_id from URL: ${url}`);
  return m[1];
}
