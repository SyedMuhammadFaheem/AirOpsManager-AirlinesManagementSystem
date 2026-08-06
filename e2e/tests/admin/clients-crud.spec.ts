import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins, uniqueEmail } from '../../fixtures/test-data';

test.describe('admin: clients CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/clients');
  });

  test('list page renders seeded clients', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
    await expect(page.getByText('mohsinalimirza@gmail.com')).toBeVisible();
  });

  test('create, view, edit, delete a client end-to-end', async ({ page }) => {
    const email = uniqueEmail('crud-client');

    await page.getByRole('link', { name: /add client/i }).click();
    await expect(page).toHaveURL(/\/clients\/new/);
    await expect(page.locator('input[name="client_id"]')).toHaveCount(0); // client_id is DB auto-increment, no manual field
    await page.locator('input[name="fname"]').fill('CrudTest');
    await page.locator('input[name="lname"]').fill('User');
    await page.locator('input[name="phone"]').fill('+923001234567');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="passport"]').fill(`PASS${Date.now()}`);
    await page.locator('input[name="password"]').fill('clientpass123');
    await page.getByRole('button', { name: /add client/i }).click();
    await expect(page.getByText(/client added/i)).toBeVisible();
    await expect(page).toHaveURL(/\/clients$/, { timeout: 5000 });

    // View
    await page.locator(`tr:has-text("${email}")`).getByTitle('View').click();
    await expect(page).toHaveURL(/\/clients\/\d+$/);
    await expect(page.getByText(email)).toBeVisible();

    // Edit
    await page.goto('/clients');
    await page.locator(`tr:has-text("${email}")`).getByTitle('Edit').click();
    await expect(page).toHaveURL(/\/clients\/\d+\/edit$/);
    await page.locator('input[name="fname"]').fill('CrudEdited');
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText(/client updated/i)).toBeVisible();
    await expect(page).toHaveURL(/\/clients$/, { timeout: 5000 });
    await expect(page.getByText('CrudEdited')).toBeVisible();

    // Delete
    page.once('dialog', () => {}); // SweetAlert2 isn't a native dialog; no-op guard
    await page.locator(`tr:has-text("${email}")`).getByTitle('Delete').click();
    await page.getByRole('button', { name: /delete/i }).click(); // SweetAlert2 confirm button
    await expect(page.getByText(/client deleted/i)).toBeVisible();
    await expect(page.getByText(email)).toHaveCount(0);
  });

  test('submitting the add-client form with missing required fields shows a toast and does not navigate', async ({ page }) => {
    await page.getByRole('link', { name: /add client/i }).click();
    await page.getByRole('button', { name: /add client/i }).click();
    await expect(page.getByText(/please fill all required fields/i)).toBeVisible();
    await expect(page).toHaveURL(/\/clients\/new/);
  });
});
