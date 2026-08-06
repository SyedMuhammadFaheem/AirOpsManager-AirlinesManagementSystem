import { test, expect } from '@playwright/test';
import { seedAdmins, seedCustomers, uniqueEmail } from '../../fixtures/test-data';

// Runs after every other login-dependent spec (alphabetical folder order: admin, auth,
// cross-cutting, customer, security, validation) and fixtures/auth.ts caches cookies per
// username so those earlier specs mostly don't count against these limiters anyway (see the
// comment there). This file is the canonical home for verifying the limiters themselves.

test.describe('login rate limiting (server/middleware/rateLimiter.js)', () => {
  test('admin login: exceeding 5 requests/15min from one IP returns 429', async ({ request }) => {
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      const res = await request.post('http://localhost:5001/auth/login', {
        data: { username: seedAdmins.faheem.username, password: 'definitely-wrong' },
      });
      statuses.push(res.status());
    }
    expect(statuses).toContain(429);
  });

  test('customer login: exceeding 10 requests/15min from one IP returns 429', async ({ request }) => {
    const statuses: number[] = [];
    for (let i = 0; i < 12; i++) {
      const res = await request.post('http://localhost:5001/auth/customerlogin', {
        data: { email: seedCustomers.mohsin.email, password: 'definitely-wrong' },
      });
      statuses.push(res.status());
    }
    expect(statuses).toContain(429);
  });

  test('a rate-limited (429) admin login is surfaced in the UI as the same generic error, not a raw failure', async ({ page, request }) => {
    // Exhaust the limiter first via the API (fast/deterministic), then drive one real UI attempt.
    for (let i = 0; i < 6; i++) {
      await request.post('http://localhost:5001/auth/login', {
        data: { username: seedAdmins.faheem.username, password: 'still-wrong' },
      });
    }
    await page.goto('/signin');
    await page.locator('input[type="text"]').fill(seedAdmins.faheem.username);
    await page.locator('input[type="password"]').fill(seedAdmins.faheem.password); // even the correct password now 429s
    let sawResponse: number | undefined;
    page.on('response', (res) => { if (res.url().includes('/auth/login')) sawResponse = res.status(); });
    await page.getByRole('button', { name: /sign in/i }).click();
    // Signin.js's catch-all shows "Invalid credentials" for ANY error, including 429 — it never
    // surfaces the server's actual "Too many login attempts..." message. Documented UX gap.
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    expect(sawResponse).toBe(429);
    // Confirms it fires once and the page doesn't loop/redirect anywhere.
    await expect(page).toHaveURL(/\/signin/);
  });

  test('signup: exceeding 10 requests/15min from one IP returns 429 (fixed — was previously unlimited)', async ({ request }) => {
    const statuses: number[] = [];
    for (let i = 0; i < 12; i++) {
      const res = await request.post('http://localhost:5001/auth/signup', {
        data: {
          fname: 'Rate', lname: 'Limit', phone: `+92300000${1000 + i}`, email: uniqueEmail(`ratelimit${i}`),
          passport: `RL${Date.now()}${i}`, password: 'validPass123',
        },
      });
      statuses.push(res.status());
    }
    expect(statuses).toContain(429);
  });
});
