import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins, uniqueNumericId } from '../../fixtures/test-data';

test.describe('admin: flights (create + delete only, no edit)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/flights');
  });

  test('list page renders seeded flights and has no bulk edit affordance', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Flights' })).toBeVisible();
    await expect(page.getByText('40').first()).toBeVisible();
  });

  test('create then delete a flight; row actions are View + Delete only, no Edit icon', async ({ page }) => {
    const flightNo = uniqueNumericId();

    await page.getByRole('link', { name: /add flight/i }).click();
    await expect(page).toHaveURL(/\/flights\/new/);
    // Reuse seeded FK targets (schedule 51, flightStatus 61, airplane 41) to satisfy foreign keys.
    await page.locator('input[name="flight_no"]').fill(String(flightNo));
    await page.locator('input[name="schedule_id"]').fill('51');
    await page.locator('input[name="flightStatus_id"]').fill('61');
    await page.locator('input[name="airplane_id"]').fill('41');
    await page.locator('input[name="fares"]').fill('1500');
    await page.getByRole('button', { name: /add flight/i }).click();
    await expect(page.getByText(/flight added successfully/i)).toBeVisible();
    await expect(page).toHaveURL(/\/flights$/, { timeout: 5000 });

    const row = page.locator(`tr:has-text("${flightNo}")`);
    await expect(row.getByTitle('View')).toBeVisible();
    await expect(row.getByTitle('Delete')).toBeVisible();
    await expect(row.getByTitle('Edit')).toHaveCount(0);

    await row.getByTitle('Delete').click();
    await page.getByRole('button', { name: /delete/i }).click();
    await expect(page.getByText(/flight deleted/i)).toBeVisible();
    await expect(page.locator(`tr:has-text("${flightNo}")`)).toHaveCount(0);
  });

  test('submitting the add form with empty fields shows a toast and does not navigate', async ({ page }) => {
    await page.getByRole('link', { name: /add flight/i }).click();
    await page.getByRole('button', { name: /add flight/i }).click();
    await expect(page.getByText(/all fields are required/i)).toBeVisible();
    await expect(page).toHaveURL(/\/flights\/new/);
  });

  test('confirmed gap: no /flights/:id/edit route exists — navigating there renders NotFound, not a broken/hidden page', async ({ page }) => {
    // client/src/App.js has no <ProtectedRoute path="/flights/:id/edit" ...> entry (unlike clients,
    // airplanes and schedules which all have one). React Router falls through to the catch-all route.
    await page.goto('/flights/40/edit');
    await expect(page.getByText(/page not found/i)).toBeVisible();
    await expect(page.getByText('404')).toBeVisible();
  });
});
