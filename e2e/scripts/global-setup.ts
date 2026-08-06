import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { seedAdmins, seedCustomers, seedCustomerPassword } from '../fixtures/test-data';

// Playwright restarts the worker PROCESS between (at least some) tests even with workers:1 —
// observed via workerIndex incrementing on every single test in test-results/results.json. That
// means an in-memory Map cache (the original approach) never survives past the first test, so
// every spec's loginAsAdmin/loginAsCustomer call was doing a REAL request, blowing through
// adminLimiter (5/15min) and customerLimiter (10/15min) within the first couple of files and
// cascading failures through the rest of the run. Fix: authenticate every identity actually used
// anywhere in the suite exactly ONCE here, in globalSetup (which Playwright guarantees runs once
// per `playwright test` invocation, before any worker starts), and persist each identity's
// cookies to disk under .auth/ — fixtures/auth.ts reads from these files instead of an in-memory
// cache, so cookie reuse survives worker restarts.
const AUTH_DIR = path.resolve(__dirname, '../.auth');
// /auth/* routes live on the backend (5001), not the CRA dev server (3000) — the cookie's
// `domain` is what matters for the browser to send it back to the frontend origin later, and
// since both run on localhost this works regardless of which port issued the Set-Cookie.
const BASE_URL = 'http://localhost:5001';

async function saveAdminCookies(username: string, password: string) {
  const ctx = await request.newContext({ baseURL: BASE_URL });
  const res = await ctx.post('/auth/login', { data: { username, password } });
  if (!res.ok()) throw new Error(`global-setup: admin login failed for ${username}: ${res.status()}`);
  const cookies = (await ctx.storageState()).cookies.filter((c) => c.name === 'admin_token');
  fs.writeFileSync(path.join(AUTH_DIR, `admin-${username}.json`), JSON.stringify(cookies));
  await ctx.dispose();
}

async function saveCustomerCookies(email: string, password: string) {
  const ctx = await request.newContext({ baseURL: BASE_URL });
  const res = await ctx.post('/auth/customerlogin', { data: { email, password } });
  if (!res.ok()) throw new Error(`global-setup: customer login failed for ${email}: ${res.status()}`);
  const cookies = (await ctx.storageState()).cookies.filter((c) => c.name === 'customer_token');
  fs.writeFileSync(path.join(AUTH_DIR, `customer-${email}.json`), JSON.stringify(cookies));
  await ctx.dispose();
}

export default async function globalSetup() {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  // Only identities actually referenced via loginAsAdmin/loginAsCustomer anywhere in tests/ —
  // keep this list in sync with grep -rhoE "seedAdmins\.\w+|seedCustomers\.\w+" tests/ so the
  // total stays comfortably under both rate limits for a single `playwright test` invocation.
  for (const { username, password } of [seedAdmins.faheem, seedAdmins.mohsin, seedAdmins.ahmad]) {
    await saveAdminCookies(username, password);
  }
  for (const c of [seedCustomers.marij, seedCustomers.mohsin, seedCustomers.wahaj, seedCustomers.waleed]) {
    await saveCustomerCookies(c.email, seedCustomerPassword);
  }
}
