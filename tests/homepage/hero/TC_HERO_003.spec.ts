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

        // Step 4: Validate all Hero slides 1 to N using slide selection and Next button (Validate ER-3 & ER-4)
        for (let i = 0; i < totalSlides; i++) {
            await homePage.heroSlider.selectSlide(i);
            await homePage.heroSlider.clickNextButton();
            await homePage.heroSlider.verifySlideImageLoaded(i);
        }

        // Step 5, 6 & 7: Validate all Hero slides in reverse order using Previous button (Validate ER-5, ER-6 & ER-7)
        for (let i = totalSlides - 1; i >= 0; i--) {
            await homePage.heroSlider.selectSlide(i);
            await homePage.heroSlider.clickPreviousButton();
            await homePage.heroSlider.verifySlideImageLoaded(i);
        }
    });
});
