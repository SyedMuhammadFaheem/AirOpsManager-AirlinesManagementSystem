import { test, expect } from '@playwright/test';
import { uniqueEmail } from '../../fixtures/test-data';

// Signup.js's <Field> inputs don't set a `name` attribute and labels aren't associated via
// htmlFor, so accessible/name-based locators aren't available here — placeholder text and
// input `type` are the only stable selectors the real DOM offers.
async function fillSignupForm(page: import('@playwright/test').Page, opts: {
  fname: string; lname: string; phone: string; email: string; passport: string; password: string; confirmPassword?: string;
}) {
  await page.goto('/sign-up');
  await page.locator('input[placeholder="Jane"]').fill(opts.fname);
  await page.locator('input[placeholder="Smith"]').fill(opts.lname);
  await page.locator('input[type="tel"]').fill(opts.phone);
  await page.locator('input[type="email"]').fill(opts.email);
  await page.locator('input[placeholder="AA1234567"]').fill(opts.passport);
  const passwordInputs = page.locator('input[type="password"]');
  await passwordInputs.nth(0).fill(opts.password);
  await passwordInputs.nth(1).fill(opts.confirmPassword ?? opts.password);
}

test.describe('customer signup', () => {
  test('happy path registers and redirects to customer sign-in', async ({ page }) => {
    const email = uniqueEmail('signup-ok');
    await fillSignupForm(page, {
      fname: 'Jane', lname: 'Doe', phone: '+923000000001', email, passport: `SG${Date.now()}`, password: 'validPass123',
    });
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page.getByText(/registered successfully/i)).toBeVisible();
    await expect(page).toHaveURL(/\/customer-signin/, { timeout: 5000 });
  });

  test('duplicate email is rejected (409) and shown as a generic signup error', async ({ page }) => {
    // seeded customer email — guaranteed to already exist
    await fillSignupForm(page, {
      fname: 'Dup', lname: 'Licate', phone: '+923000000002', email: 'mohsinalimirza@gmail.com',
      passport: `DUP${Date.now()}`, password: 'validPass123',
    });
    await page.getByRole('button', { name: /create account/i }).click();
    // Signup.js's catch-all shows a generic "Error in Signup!" Swal for any failure, including 409 —
    // it doesn't surface the server's "Email already registered" message. Documenting actual behavior.
    await expect(page.getByText(/error in signup/i)).toBeVisible();
    await expect(page).toHaveURL(/\/sign-up/);
  });

  test('password shorter than 8 chars is rejected by the server (400) and shown as a signup error', async ({ page }) => {
    const email = uniqueEmail('shortpw');
    await fillSignupForm(page, {
      fname: 'Short', lname: 'Pass', phone: '+923000000003', email, passport: `SP${Date.now()}`, password: 'short1',
    });
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page.getByText(/error in signup/i)).toBeVisible();
    await expect(page).toHaveURL(/\/sign-up/);
  });

  test('mismatched confirm-password is caught client-side before any network call', async ({ page }) => {
    let requestFired = false;
    page.on('request', (req) => { if (req.url().includes('/auth/signup')) requestFired = true; });
    await fillSignupForm(page, {
      fname: 'Mis', lname: 'Match', phone: '+923000000004', email: uniqueEmail('mismatch'),
      passport: `MM${Date.now()}`, password: 'validPass123', confirmPassword: 'differentPass123',
    });
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page.getByText(/doesn.t match/i)).toBeVisible();
    expect(requestFired).toBe(false);
  });

  // signup rate-limiting is now covered in security/rate-limiting.spec.ts (isolated, fresh
  // server process — see that file for why it must run separately from this main suite).
});
