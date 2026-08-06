import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins, uniqueNumericId } from '../../fixtures/test-data';

test.describe('admin: schedules CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/schedules');
  });

  test('list page renders seeded schedules', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Schedules' })).toBeVisible();
    await expect(page.getByText('51').first()).toBeVisible();
  });

  test('create, view, edit, delete a schedule end-to-end', async ({ page }) => {
    const scheduleId = uniqueNumericId();

    await page.getByRole('link', { name: /add schedule/i }).click();
    await expect(page).toHaveURL(/\/schedules\/new/);
    await page.locator('input[name="schedule_id"]').fill(String(scheduleId));
    await page.locator('input[name="departure_time"]').fill('2027-01-15T09:00');
    await page.locator('input[name="arrival_time"]').fill('2027-01-15T12:00');
    await page.locator('input[name="duration_time"]').fill('3');
    await page.getByRole('button', { name: /add schedule/i }).click();
    await expect(page.getByText(/schedule added/i)).toBeVisible();
    await expect(page).toHaveURL(/\/schedules$/, { timeout: 5000 });

    const row = page.locator(`tr:has-text("${scheduleId}")`);
    await row.getByTitle('View').click();
    await expect(page).toHaveURL(new RegExp(`/schedules/${scheduleId}$`));

    await page.goto('/schedules');
    await page.locator(`tr:has-text("${scheduleId}")`).getByTitle('Edit').click();
    await expect(page).toHaveURL(new RegExp(`/schedules/${scheduleId}/edit`));
    await page.locator('input[name="duration_time"]').fill('4');
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText(/schedule updated/i)).toBeVisible();
    await expect(page).toHaveURL(/\/schedules$/, { timeout: 5000 });

    await page.locator(`tr:has-text("${scheduleId}")`).getByTitle('Delete').click();
    await page.getByRole('button', { name: /delete/i }).click();
    await expect(page.getByText(/schedule deleted/i)).toBeVisible();
    await expect(page.locator(`tr:has-text("${scheduleId}")`)).toHaveCount(0);
  });

  test('submitting the add form with empty fields shows a toast and does not navigate', async ({ page }) => {
    await page.getByRole('link', { name: /add schedule/i }).click();
    await page.getByRole('button', { name: /add schedule/i }).click();
    await expect(page.getByText(/schedule id, departure and arrival times are required/i)).toBeVisible();
    await expect(page).toHaveURL(/\/schedules\/new/);
  });
});
