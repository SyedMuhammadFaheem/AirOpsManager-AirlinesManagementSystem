import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsCustomer } from '../../fixtures/auth';
import { seedAdmins, seedCustomers, seedCustomerPassword, bookingFlowFlight } from '../../fixtures/test-data';

// Flagship end-to-end test: search -> book -> pay -> boarding pass -> visible in my-tickets
// and in the admin bookings dashboard. Uses seeded flight_no 40 (schedule 60, fares 5000,
// airplane 50), the only flight whose schedule dates are both 9-Jul-2023 in seeds.sql, so the
// AvailableFlights date-match query returns exactly one row. Customer wahaj (client_id 4) is
// used here specifically so it doesn't collide with customer/review-flow.spec.ts's customer.

test.describe('customer: full booking flow', () => {
  test('search, book, pay, and see the ticket everywhere it should appear', async ({ page, browser }) => {
    await loginAsCustomer(page, seedCustomers.wahaj.email, seedCustomerPassword);
    const clientId = String(seedCustomers.wahaj.client_id);

    // 1. Search for a flight
    await page.goto(`/book-ticket/${clientId}`);
    await page.locator('select[name="departure"]').selectOption({ index: 1 });
    await page.locator('select[name="arrival"]').selectOption({ index: 2 });
    await page.locator('input[name="departureDate"]').fill(bookingFlowFlight.departureDateISO);
    await page.locator('input[name="returnDate"]').fill(bookingFlowFlight.departureDateISO);
    // class defaults to Economy, price defaults to "All Prices" (fares=0, matches any fare)
    await page.getByRole('button', { name: /search flights/i }).click();

    // 2. Available flights — expect the single seeded match
    await expect(page).toHaveURL(new RegExp(`/available-flights/${clientId}`));
    await expect(page.getByText(`$ ${bookingFlowFlight.fares}`)).toBeVisible({ timeout: 10_000 });
    // exact: true avoids matching CustomerNavbar's "Book Flight" nav link (substring match would hit it first)
    await page.getByRole('link', { name: 'Book', exact: true }).first().click();

    // 3. Invoice / booking summary
    await expect(page).toHaveURL(new RegExp(`/invoice/${bookingFlowFlight.schedule_id}-${clientId}`));
    await expect(page.getByText(/total amount due/i)).toBeVisible();
    await page.getByRole('button', { name: /confirm & pay/i }).click();
    await expect(page.getByText(/ticket booked/i)).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: /ok/i }).click();

    // 4. Boarding pass
    await expect(page).toHaveURL(new RegExp(`/boarding-pass/${clientId}`), { timeout: 10_000 });
    await expect(page.getByText(String(bookingFlowFlight.flight_no), { exact: true })).toBeVisible();

    // 5. My Tickets shows the same booking
    await page.goto(`/my-tickets/${clientId}`);
    await expect(page.getByText(String(bookingFlowFlight.flight_no), { exact: true }).first()).toBeVisible();

    // 6. Cross-check: admin bookings dashboard shows the new row (separate browser context —
    // logging in as admin in the same context would clobber the customer_token cookie).
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    await loginAsAdmin(adminPage, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await adminPage.goto('/bookings');
    await expect(adminPage.locator(`tbody tr:has-text("${bookingFlowFlight.flight_no}")`).first()).toBeVisible({ timeout: 10_000 });
    await adminContext.close();
  });
});
