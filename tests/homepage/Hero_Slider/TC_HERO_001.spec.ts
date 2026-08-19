import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Slider', () => {
    test('TC_HERO_001 - Validate Hero section is displayed correctly', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Check the Hero section displayed at the top of the Home page (Validate ER-1)
        await homePage.heroSlider.verifyHeroSectionDisplayedAtTop();

        // Step 3: Check the Hero image/background (Validate ER-2)
        await homePage.heroSlider.verifyHeroImageLoadedCorrectly();
    });
});
