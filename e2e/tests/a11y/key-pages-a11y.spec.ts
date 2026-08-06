import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { loginAsAdmin, loginAsCustomer } from '../../fixtures/auth';
import { seedAdmins, seedCustomers, seedCustomerPassword } from '../../fixtures/test-data';

// Only 'serious'/'critical' impact violations fail the test; 'moderate'/'minor' are logged via
// test.info().attach so they're visible in the HTML report without blocking the run.
async function scanAndAssert(page: import('@playwright/test').Page, testInfo: import('@playwright/test').TestInfo) {
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  const nonBlocking = results.violations.filter((v) => v.impact !== 'serious' && v.impact !== 'critical');

  if (nonBlocking.length) {
    await testInfo.attach('axe-non-blocking-violations', {
      body: JSON.stringify(nonBlocking.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), null, 2),
      contentType: 'application/json',
    });
  }

  expect(blocking, `serious/critical a11y violations: ${blocking.map((v) => v.id).join(', ')}`).toEqual([]);
}

test.describe('accessibility scans (axe-core, serious/critical only fail the test)', () => {
  test('home page', async ({ page }, testInfo) => {
    await page.goto('/');
    await scanAndAssert(page, testInfo);
  });

  test('/signin', async ({ page }, testInfo) => {
    await page.goto('/signin');
    await scanAndAssert(page, testInfo);
  });

  test('/customer-signin', async ({ page }, testInfo) => {
    await page.goto('/customer-signin');
    await scanAndAssert(page, testInfo);
  });

  test('/sign-up', async ({ page }, testInfo) => {
    await page.goto('/sign-up');
    await scanAndAssert(page, testInfo);
  });

  test('/admin-panel', async ({ page }, testInfo) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await scanAndAssert(page, testInfo);
  });

  test('/customer-panel/:id', async ({ page }, testInfo) => {
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    await scanAndAssert(page, testInfo);
  });

  test('/book-ticket/:id', async ({ page }, testInfo) => {
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    await page.goto(`/book-ticket/${seedCustomers.marij.client_id}`);
    await scanAndAssert(page, testInfo);
  });

  test('/add-review/:id', async ({ page }, testInfo) => {
    await loginAsCustomer(page, seedCustomers.marij.email, seedCustomerPassword);
    await page.goto(`/add-review/${seedCustomers.marij.client_id}`);
    await scanAndAssert(page, testInfo);
  });
});

test.describe('keyboard navigation basics', () => {
  test('admin login form: tab order reaches both fields and submit works via Enter', async ({ page }) => {
    await page.goto('/signin');
    await page.locator('input[type="text"]').focus();
    await page.keyboard.type(seedAdmins.mohsin.username);
    await page.keyboard.press('Tab');
    await expect(page.locator('input[type="password"]')).toBeFocused();
    await page.keyboard.type(seedAdmins.mohsin.password);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/admin-panel/, { timeout: 10_000 });
  });

  test('add-client form: all fields are reachable via Tab in a sane order', async ({ page }) => {
    await loginAsAdmin(page, seedAdmins.faheem.username, seedAdmins.faheem.password);
    await page.goto('/clients/new');
    await page.locator('input[name="fname"]').focus();
    await expect(page.locator('input[name="fname"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="lname"]')).toBeFocused();
  });
});
