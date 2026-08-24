import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', { tag: ['@regression', '@visual'] }, () => {
    test('TC_HERO_003 - Validate all Hero carousel images/slides using Next and Previous arrows', async ({
        homePage,
    }) => {
        // Set extended timeout for multi-slide carousel navigation & validation
        test.setTimeout(90000);

        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Locate the Hero carousel/slider (Validate ER-1)
        await homePage.heroSlider.verifyHeroSectionVisible();
        await homePage.heroSlider.verifyNavigationArrowsVisible();

        // Step 3: Identify the total number of available Hero slides/images (Validate ER-2)
        const totalSlides = await homePage.heroSlider.getSlideCount();

        // Step 4 & Step 5: Click Next (>) arrow to transition forward through every available slide (Validate ER-3, ER-4 & ER-7)
        for (let i = 1; i < totalSlides; i++) {
            await homePage.heroSlider.clickNextButton();
            await homePage.heroSlider.verifySlideImageLoaded(i);
        }

        // Step 6 & Step 7: Click Previous (<) arrow from the last slide back to the first slide (Validate ER-5, ER-6 & ER-7)
        for (let i = totalSlides - 2; i >= 0; i--) {
            await homePage.heroSlider.clickPreviousButton();
            await homePage.heroSlider.verifySlideImageLoaded(i);
        }
    });
});
