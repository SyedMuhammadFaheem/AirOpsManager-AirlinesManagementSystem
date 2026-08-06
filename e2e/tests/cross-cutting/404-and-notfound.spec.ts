import { test, expect } from '@playwright/test';

// App.js's Switch ends with a catch-all `<Route component={NotFound} />` with no `path`, so any
// URL that doesn't match an earlier route renders NotFound (client/src/components/Pages/NotFound.js).

test.describe('404 handling for unknown URLs', () => {
  test('a garbage top-level URL renders the NotFound page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-12345');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText(/page not found/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

  test('a garbage nested URL under a real resource segment also renders NotFound', async ({ page }) => {
    await page.goto('/clients/abc/xyz/123');
    await expect(page.getByText('404')).toBeVisible();
  });

  test('NotFound\'s "Back to Home" link navigates to /', async ({ page }) => {
    await page.goto('/nowhere');
    await page.getByRole('link', { name: /back to home/i }).click();
    await expect(page).toHaveURL('/');
  });
});
