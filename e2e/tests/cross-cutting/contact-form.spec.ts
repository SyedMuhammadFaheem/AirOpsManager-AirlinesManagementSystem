import { test, expect } from '@playwright/test';

// client/src/components/Pages/Contact.js's handleSubmit only calls e.preventDefault(),
// setSent(true), and a setTimeout to reset the form after 3s — there is no apiClient call and
// no backend endpoint for contact submissions anywhere in server/routes. This test documents
// that observed behavior: the form silently no-ops over the network and fakes a "sent" state
// purely client-side.

test.describe('contact form (documents actual behavior — no backend exists)', () => {
  test('submitting the contact form makes no network request and shows a fake "sent" confirmation', async ({ page }) => {
    await page.goto('/contact-us');

    const requests: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (!url.includes('/contact-us') && req.method() !== 'GET') requests.push(url);
    });

    // Contact.js's <label> elements aren't associated to their inputs (no htmlFor/id, not
    // wrapping), so getByLabel() can't find them — placeholder text is the only stable locator.
    await page.locator('input[placeholder="Your full name"]').fill('Test User');
    await page.locator('input[placeholder="your@email.com"]').fill('test@example.com');
    await page.locator('textarea[placeholder="How can we help you?"]').fill('Hello, this is a test message.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/message sent/i)).toBeVisible();
    expect(requests).toHaveLength(0);

    // Confirms the "sent" state is faked client-side and resets after ~3s per the component's setTimeout.
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible({ timeout: 5000 });
  });
});
