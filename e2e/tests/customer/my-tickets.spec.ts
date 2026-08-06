import { test, expect } from '@playwright/test';
import { loginAsCustomer } from '../../fixtures/auth';
import { seedCustomers, seedCustomerPassword, bookingFlowFlight } from '../../fixtures/test-data';

// Runs after booking-flow.spec.ts (alphabetically "booking-flow" < "my-tickets" within
// customer/), so seedCustomers.wahaj already has exactly one ticket by the time this runs.

test.describe('customer: my tickets (scoped to own bookings)', () => {
  test('customer with a completed booking sees it in My Tickets', async ({ page }) => {
    await loginAsCustomer(page, seedCustomers.wahaj.email, seedCustomerPassword);
    await page.goto(`/my-tickets/${seedCustomers.wahaj.client_id}`);
    await expect(page.getByRole('heading', { name: /my tickets/i })).toBeVisible();
    await expect(page.getByText(String(bookingFlowFlight.flight_no), { exact: true }).first()).toBeVisible();
  });

  test('customer with no bookings sees the empty state, not another customer\'s data', async ({ page }) => {
    // Reuses marij (cached, and only ever used for page views elsewhere — never books a
    // ticket) rather than a fresh identity, to stay under customerLimiter's budget.
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    await page.goto(`/my-tickets/${seedCustomers.marij.client_id}`);
    await expect(page.getByText(/no tickets found/i)).toBeVisible();
    await expect(page.getByText(String(bookingFlowFlight.flight_no))).toHaveCount(0);
  });
});
