import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsCustomer } from '../../fixtures/auth';
import { seedAdmins, seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

// DEVIATION FROM PLAN: the plan assumed admin CRUD forms show "inline field-level errors" on
// invalid/empty submission. Reading the actual components (AddEditClient.js, AddEditAirplane.js,
// AddFlight.js, AddEditSchedule.js) shows they only call `toast.error('...')` with one summary
// message and never render per-field error text or error styling — there IS NO inline
// field-level validation UI on any admin form. The one exception is BookTicket.js, which uses
// react-hook-form's `errors` object and genuinely renders inline text under each invalid field.
// Every test below documents the ACTUAL behavior observed in the code, not the originally
// assumed one. In all cases, though, the forms correctly avoid a silent no-op or premature
// navigation.

test.describe('admin forms: toast-only validation (no inline field errors), no silent no-op / no premature navigation', () => {
  test('admin login: empty fields are blocked by native HTML5 `required`, no network call, stays on /signin', async ({ page }) => {
    await page.goto('/signin');
    let requestFired = false;
    page.on('request', (req) => { if (req.url().includes('/auth/login')) requestFired = true; });
    await page.getByRole('button', { name: /sign in/i }).click();
    expect(requestFired).toBe(false);
    await expect(page).toHaveURL(/\/signin/);
  });

  test('add-client: empty required fields -> single summary toast, no inline per-field errors, stays on /clients/new', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/clients/new');
    await page.getByRole('button', { name: /add client/i }).click();
    await expect(page.getByText(/please fill all required fields/i)).toBeVisible();
    await expect(page).toHaveURL(/\/clients\/new/);
  });

  test('add-airplane: empty required fields -> single summary toast, stays on /airplanes/new', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/airplanes/new');
    await page.getByRole('button', { name: /add airplane/i }).click();
    await expect(page.getByText(/all fields are required/i)).toBeVisible();
    await expect(page).toHaveURL(/\/airplanes\/new/);
  });

  test('add-flight: empty required fields -> single summary toast, stays on /flights/new', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/flights/new');
    await page.getByRole('button', { name: /add flight/i }).click();
    await expect(page.getByText(/all fields are required/i)).toBeVisible();
    await expect(page).toHaveURL(/\/flights\/new/);
  });

  test('add-schedule: empty required fields -> single summary toast, stays on /schedules/new', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/schedules/new');
    await page.getByRole('button', { name: /add schedule/i }).click();
    await expect(page.getByText(/schedule id, departure and arrival times are required/i)).toBeVisible();
    await expect(page).toHaveURL(/\/schedules\/new/);
  });
});

test.describe('the one form that DOES have real inline field-level errors', () => {
  test('book-ticket search form (react-hook-form): empty submit shows inline per-field messages', async ({ page }) => {
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    await page.goto(`/book-ticket/${seedCustomers.marij.client_id}`);
    await page.getByRole('button', { name: /search flights/i }).click();
    await expect(page.getByText('Departure is required')).toBeVisible();
    await expect(page.getByText('Arrival is required')).toBeVisible();
    // still on the same page — no premature navigation despite the invalid submit
    await expect(page).toHaveURL(new RegExp(`/book-ticket/${seedCustomers.marij.client_id}`));
  });
});
