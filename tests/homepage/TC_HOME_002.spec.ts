import { test, expect } from '@playwright/test';
import { URLS } from '../../utils/urls';

test('TC_HOME_002 - Verify correct Home page URL is displayed', async ({ page }) => {
    await page.goto(URLS.HOMEPAGE);

    await expect(page).toHaveURL(URLS.HOMEPAGE);
});