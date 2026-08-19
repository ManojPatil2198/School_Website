import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', () => {
    test('TC_HERO_005 - Validate Hero responsive layout', async ({ page, homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Enable desktop viewport and verify the Hero section (Validate ER-1, ER-4, ER-5, ER-6, ER-7)
        await page.setViewportSize({ width: 1920, height: 1080 });
        await homePage.heroSlider.verifyResponsiveLayout('Desktop 1920x1080');

        // Step 3: Enable tablet viewport and verify the Hero section (Validate ER-2, ER-4, ER-5, ER-6, ER-7)
        await page.setViewportSize({ width: 768, height: 1024 });
        await homePage.heroSlider.verifyResponsiveLayout('Tablet 768x1024');

        // Step 4: Enable mobile viewport and verify the Hero section (Validate ER-3, ER-4, ER-5, ER-6, ER-7)
        await page.setViewportSize({ width: 390, height: 844 });
        await homePage.heroSlider.verifyResponsiveLayout('Mobile 390x844');
    });
});
