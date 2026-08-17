import { test, expect } from '@playwright/test';

test('TC_HOME_001 - Verify correct Home page URL is displayed', async ({ page }) => {
    await page.goto('');

    await expect(page).toHaveURL(/.*united-school-of-tok\/home/);
});
