import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', () => {
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

        // Step 4: Click the Next (>) arrow and verify the displayed Hero slide/image (Validate ER-3)
        await homePage.heroSlider.clickNextButton();
        await homePage.heroSlider.verifySlideImageLoaded(1);

        // Step 5: Continue clicking the Next (>) arrow until all available Hero slides/images have been displayed (Validate ER-4)
        for (let i = 2; i < totalSlides; i++) {
            await homePage.heroSlider.clickNextButton();
            await homePage.heroSlider.verifySlideImageLoaded(i);
        }

        // Step 6: Click the Previous (<) arrow from the last slide (Validate ER-5)
        await homePage.heroSlider.clickPreviousButton();
        await homePage.heroSlider.verifySlideImageLoaded(totalSlides - 2);

        // Step 7: Continue clicking the Previous (<) arrow until all Hero slides/images have been displayed in reverse order (Validate ER-6 & ER-7)
        for (let i = totalSlides - 3; i >= 0; i--) {
            await homePage.heroSlider.clickPreviousButton();
            await homePage.heroSlider.verifySlideImageLoaded(i);
        }
    });
});
