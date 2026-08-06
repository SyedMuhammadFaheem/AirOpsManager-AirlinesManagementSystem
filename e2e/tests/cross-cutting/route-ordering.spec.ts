import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins } from '../../fixtures/test-data';

// client/src/App.js declares `/clients/new` (and airplanes/schedules) BEFORE the `/:id` route
// for the same resource, so react-router-dom v5's Switch matches the literal "new" segment
// first rather than treating it as an :id. This guards against a route-ordering regression
// (e.g. if someone reorders the <Route> list) silently breaking the "Add" forms.

test.describe('route ordering: /new is not swallowed by the /:id route', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
  });

  test('/clients/new renders the Add Client form, not the client detail/view page', async ({ page }) => {
    await page.goto('/clients/new');
    await expect(page.getByRole('heading', { name: /add new client/i })).toBeVisible();
    await expect(page.locator('input[name="fname"]')).toBeVisible();
  });

  test('/airplanes/new renders the Add Airplane form, not the airplane detail/view page', async ({ page }) => {
    await page.goto('/airplanes/new');
    await expect(page.getByRole('heading', { name: /add airplane/i })).toBeVisible();
    await expect(page.locator('input[name="airplane_id"]')).toBeVisible();
  });

  test('/schedules/new renders the Add Schedule form, not the schedule detail/view page', async ({ page }) => {
    await page.goto('/schedules/new');
    await expect(page.getByRole('heading', { name: /add schedule/i })).toBeVisible();
    await expect(page.locator('input[name="schedule_id"]')).toBeVisible();
  });

  test('/flights/new renders the Add Flight form (flights has no /:id/edit route to collide with)', async ({ page }) => {
    await page.goto('/flights/new');
    await expect(page.getByRole('heading', { name: /add flight/i })).toBeVisible();
  });
});
