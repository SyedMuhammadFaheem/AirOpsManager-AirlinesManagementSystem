import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsCustomer } from '../../fixtures/auth';
import { seedAdmins, seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

// Generated from the route table in client/src/App.js — every ProtectedRoute (admin) and
// CustomerRoute path, using seeded IDs where a :id param is required.
const adminRoutes = [
  '/admin-panel', '/clients', '/clients/new', '/clients/1/edit', '/clients/1',
  '/airplanes', '/airplanes/new', '/airplanes/41/edit', '/airplanes/41',
  '/flight-status', '/flight-status/61', '/gates', '/gates/66', '/airports', '/airports/LAX',
  '/reviews', '/reviews/1', '/schedules', '/schedules/new', '/schedules/51/edit', '/schedules/51',
  '/flights', '/flights/new', '/flights/40', '/tickets', '/tickets/edit/11', '/tickets/11',
  '/bookings',
];

const customerRoutes = [
  '/customer-panel/1', '/profile/1', '/book-ticket/1', '/available-flights/1',
  '/boarding-pass/1', '/invoice/1', '/add-review/1', '/my-tickets/1',
];

test.describe('route protection: unauthenticated users', () => {
  for (const route of adminRoutes) {
    test(`admin route ${route} redirects to /signin when logged out`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/signin/);
    });
  }

  for (const route of customerRoutes) {
    test(`customer route ${route} redirects to /customer-signin when logged out`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/customer-signin/);
    });
  }
});

test.describe('route protection: wrong-role users are redirected, not shown a broken render', () => {
  test.beforeEach(async ({ page }) => {
    // Reuses marij (cached from earlier specs) rather than a fresh identity, to stay well
    // under customerLimiter's 10-requests/15min budget across the whole suite.
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
  });

  for (const route of adminRoutes) {
    test(`customer session hitting admin route ${route} is redirected to /signin`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/signin/);
    });
  }
});

test.describe('route protection: admin session hitting customer routes is redirected, not shown a broken render', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.mohsin.username, seedAdmins.mohsin.password);
  });

  for (const route of customerRoutes) {
    test(`admin session hitting customer route ${route} is redirected to /customer-signin`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/customer-signin/);
    });
  }
});
