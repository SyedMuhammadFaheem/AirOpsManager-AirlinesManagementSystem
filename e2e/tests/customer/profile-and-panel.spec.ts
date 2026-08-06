import { test, expect } from '@playwright/test';
import { loginAsCustomer } from '../../fixtures/auth';
import { seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

test.describe('customer: panel and profile', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
  });

  test('customer panel shows a greeting and quick-action links to all customer routes', async ({ page }) => {
    const id = seedCustomers.marij.client_id;
    await expect(page).toHaveURL(new RegExp(`/customer-panel/${id}`));
    await expect(page.getByRole('link', { name: /book a flight/i })).toHaveAttribute('href', `/book-ticket/${id}`);
    // .last(): CustomerNavbar's "My Tickets" nav link also matches the substring and renders first in the DOM
    await expect(page.getByRole('link', { name: /my tickets/i }).last()).toHaveAttribute('href', `/my-tickets/${id}`);
    await expect(page.getByRole('link', { name: /view profile/i })).toHaveAttribute('href', `/profile/${id}`);
    await expect(page.getByRole('link', { name: /leave a review/i })).toHaveAttribute('href', `/add-review/${id}`);
  });

  test('profile page shows the logged-in customer\'s own details', async ({ page }) => {
    const id = seedCustomers.marij.client_id;
    await page.goto(`/profile/${id}`);
    await expect(page.getByText(`Customer ID: ${id}`)).toBeVisible();
    await expect(page.getByText('muhammadmarij@gmail.com')).toBeVisible();
  });
});
