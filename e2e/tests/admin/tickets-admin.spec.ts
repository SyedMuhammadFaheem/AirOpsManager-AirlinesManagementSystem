import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins } from '../../fixtures/test-data';

test.describe('admin: tickets (view + edit only, no add/delete)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/tickets');
  });

  test('list page has no "Add" affordance and no Delete icon per row (matches route table: no POST/DELETE routes wired)', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tickets' })).toBeVisible();
    await expect(page.getByRole('link', { name: /add ticket/i })).toHaveCount(0);
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow.getByTitle('View')).toBeVisible();
    await expect(firstRow.getByTitle('Edit')).toBeVisible();
    await expect(firstRow.getByTitle('Delete')).toHaveCount(0);
  });

  test('view a seeded ticket', async ({ page }) => {
    await page.locator('tbody tr').first().getByTitle('View').click();
    await expect(page).toHaveURL(/\/tickets\/\d+$/);
  });

  test('edit a seeded ticket updates its seat number', async ({ page }) => {
    // scope to the row whose ticket_id column (2nd td) is exactly "11" — a plain has-text("11")
    // also matches unrelated rows whose seat/gate column happens to contain "11" as a substring
    await page.locator('tbody tr').filter({ has: page.locator('td:nth-child(2)', { hasText: /^11$/ }) }).getByTitle('Edit').click();
    await expect(page).toHaveURL(/\/tickets\/edit\/11/);
    await page.locator('input[name="seat_no"]').fill('Z99');
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText(/ticket updated/i)).toBeVisible();
    await expect(page).toHaveURL(/\/tickets$/, { timeout: 5000 });
    await expect(page.getByText('Z99')).toBeVisible();
  });

  test('there is no reachable route to create a ticket directly (no /tickets/new route)', async ({ page }) => {
    await page.goto('/tickets/new');
    // /tickets/new matches the /tickets/:id ProtectedRoute (view page), which tries to
    // fetch ticket id="new" and fails — it does NOT render a create form.
    await expect(page).toHaveURL(/\/tickets\/new/);
    await expect(page.getByRole('heading', { name: /add ticket/i })).toHaveCount(0);
  });
});
