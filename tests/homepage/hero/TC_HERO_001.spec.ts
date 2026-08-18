import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', () => {
    test('TC_HERO_002 - Validate Hero section is displayed correctly', async ({ homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Check the Hero section is displayed at the top of the Home page (Validate DV-1)
        await expect(homePage.heroSlider.heroSection).toBeVisible();

        // Step 3: Check the Hero navigation dots are present (Validate DV-2)
        await expect(homePage.heroSlider.slideIndicators.first()).toBeVisible();
    });
});
