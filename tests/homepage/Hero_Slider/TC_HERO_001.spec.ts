import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Slider', () => {
    test('TC_HERO_001 - Validate Hero section is displayed correctly', async ({ homePage }) => {
        // Step 1: Open the Application URL & Navigate to Home page
        await homePage.navigate();

        // Step 2: Check the Hero section displayed at the top of the Home page (Validate ER-1)
        await expect(homePage.heroSlider.heroSection).toBeVisible();
        const box = await homePage.heroSlider.getHeroSectionBoundingBox();
        expect(box).not.toBeNull();
        expect(box!.y).toBeLessThan(300);

        // Step 3: Check the Hero image/background (Validate ER-2)
        const imageCount = await homePage.heroSlider.getHeroImagesCount();
        expect(imageCount).toBeGreaterThan(0);
        await expect(homePage.heroSlider.firstHeroImage.first()).toBeVisible();

        const imageLoaded = await homePage.heroSlider.isHeroImageLoaded();
        expect(imageLoaded).toBe(true);
    });
});
