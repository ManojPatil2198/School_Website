import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', () => {
    test('TC_HERO_002 - Validate Hero content is displayed correctly', async ({ homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Check the Hero section
        await homePage.heroSlider.verifyHeroSectionVisible();

        // Validate ER-1: Required Hero supporting text should be displayed
        await homePage.heroSlider.verifyHeroSupportingTextVisible();

        // Validate ER-2: Required Home page heading should be displayed
        await homePage.heroSlider.verifyHeroHeadingVisible();

        // Validate ER-3: Required supporting tagline should be displayed
        await homePage.heroSlider.verifyHeroSubheadingVisible();
    });
});
