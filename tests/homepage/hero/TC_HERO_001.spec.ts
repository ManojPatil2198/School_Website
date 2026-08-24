import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', { tag: ['@smoke', '@regression', '@visual'] }, () => {
    test('TC_HERO_001 - Validate Hero section is displayed correctly', async ({ homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Check the Hero section displayed at the top of the Home page (Validate ER-1)
        await homePage.heroSlider.verifyHeroSectionVisible();

        // Step 3: Check the Hero image/background (Validate ER-2)
        await homePage.heroSlider.verifyHeroImageLoaded();
    });
});
