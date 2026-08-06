import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins, uniqueNumericId } from '../../fixtures/test-data';

test.describe('admin: airplanes CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/airplanes');
  });

  test('list page renders seeded airplanes', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Airplanes' })).toBeVisible();
    await expect(page.getByText('41').first()).toBeVisible();
  });

  test('create, view, edit, delete an airplane end-to-end', async ({ page }) => {
    const airplaneId = uniqueNumericId();

    await page.getByRole('link', { name: /add airplane/i }).click();
    await expect(page).toHaveURL(/\/airplanes\/new/);
    await page.locator('input[name="airplane_id"]').fill(String(airplaneId));
    await page.locator('input[name="max_seats"]').fill('180');
    await page.getByRole('button', { name: /add airplane/i }).click();
    await expect(page.getByText(/airplane added/i)).toBeVisible();
    await expect(page).toHaveURL(/\/airplanes$/, { timeout: 5000 });

    const row = page.locator(`tr:has-text("${airplaneId}")`);
    await row.getByTitle('View').click();
    await expect(page).toHaveURL(new RegExp(`/airplanes/${airplaneId}$`));
    await expect(page.getByText('180')).toBeVisible();

    await page.goto('/airplanes');
    await page.locator(`tr:has-text("${airplaneId}")`).getByTitle('Edit').click();
    await expect(page).toHaveURL(new RegExp(`/airplanes/${airplaneId}/edit`));
    await page.locator('input[name="max_seats"]').fill('220');
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText(/airplane updated/i)).toBeVisible();
    await expect(page).toHaveURL(/\/airplanes$/, { timeout: 5000 });

    await page.locator(`tr:has-text("${airplaneId}")`).getByTitle('Delete').click();
    await page.getByRole('button', { name: /delete/i }).click();
    await expect(page.getByText(/airplane deleted/i)).toBeVisible();
    await expect(page.locator(`tr:has-text("${airplaneId}")`)).toHaveCount(0);
  });

  test('submitting the add form with empty fields shows a toast and does not navigate', async ({ page }) => {
    await page.getByRole('link', { name: /add airplane/i }).click();
    await page.getByRole('button', { name: /add airplane/i }).click();
    await expect(page.getByText(/all fields are required/i)).toBeVisible();
    await expect(page).toHaveURL(/\/airplanes\/new/);
  });
});
