import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../fixtures/auth';
import { seedAdmins } from '../../fixtures/test-data';

// flight-status, gates, airports, reviews: GET-only server routes (see server/routes/*.js),
// and their list pages render no "Add" link and each row has only a View icon (no Edit/Delete).

const readonlyEntities = [
  { name: 'Flight Status', listPath: '/flight-status', heading: 'Flight Status', seededRowText: '61' },
  { name: 'Gates', listPath: '/gates', heading: 'Gates', seededRowText: '66' },
  { name: 'Airports', listPath: '/airports', heading: 'Airports', seededRowText: 'LAX' },
  { name: 'Reviews', listPath: '/reviews', heading: 'Reviews', seededRowText: 'Good' },
];

test.describe('admin: read-only entities (list + detail, no create/edit/delete)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
  });

  for (const entity of readonlyEntities) {
    test(`${entity.name}: list has data, no Add link, no Edit/Delete icons`, async ({ page }) => {
      await page.goto(entity.listPath);
      await expect(page.getByRole('heading', { name: entity.heading })).toBeVisible();
      await expect(page.getByText(entity.seededRowText).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /^add /i })).toHaveCount(0);
      const firstRow = page.locator('tbody tr').first();
      await expect(firstRow.getByTitle('View')).toBeVisible();
      await expect(firstRow.getByTitle('Edit')).toHaveCount(0);
      await expect(firstRow.getByTitle('Delete')).toHaveCount(0);
    });

    test(`${entity.name}: detail view has no edit/delete controls`, async ({ page }) => {
      await page.goto(entity.listPath);
      await page.locator('tbody tr').first().getByTitle('View').click();
      await expect(page.getByRole('link', { name: /edit/i })).toHaveCount(0);
      await expect(page.getByRole('button', { name: /delete/i })).toHaveCount(0);
    });
  }
});
