import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins } from '../../fixtures/test-data';

// NOTE on ordering: this file runs before customer/booking-flow.spec.ts (alphabetical folder
// order: admin, auth, cross-cutting, customer, ...). Seed data's Ticket rows (seeds.sql) are
// inserted BEFORE the fill_booking trigger is created in that same file, so they never populated
// the booking table — a fresh test DB has zero bookings until a ticket is purchased through the
// UI. This file therefore only asserts on page structure / empty-state, not booking content.
// The full "a real booking shows up here" assertion lives in customer/booking-flow.spec.ts,
// which cross-checks the admin /bookings page after completing a purchase.

test.describe('admin: bookings dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/bookings');
  });

  test('renders the Bookings page with a revenue summary and no create affordance', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bookings' })).toBeVisible();
    await expect(page.getByText(/total revenue/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /^add /i })).toHaveCount(0);
  });

  test('shows an empty state or a populated table without crashing', async ({ page }) => {
    const emptyState = page.getByText(/no bookings yet/i);
    const table = page.locator('tbody tr');
    await expect(emptyState.or(table.first())).toBeVisible();
  });
});
