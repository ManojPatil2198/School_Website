import { test } from '../../../fixtures/test-fixtures';

test.describe(
    'Home Page - (TS_003) Image Properties',
    { tag: ['@smoke', '@regression', '@visual'] },
    () => {
        test('TC_IMG_001 - Validate image properties and scrolling behavior of images on Home page', async ({
            homePage,
        }) => {
            // Step 1: Open the Application URL
            await homePage.navigate();

            // Step 2: Locate the first image (girl with green background) on the Home page (Validate ER-1)
            await homePage.imageSection.scrollToFirstImage();

            // Step 3: Verify the first image is displayed correctly (Validate ER-2)
            await homePage.imageSection.verifyFirstImageDisplayed();

            // Step 4: Inspect the first image properties and verify configured image properties (object-fit: cover, object-position: 50% 50%) (Validate ER-3)
            await homePage.imageSection.verifyFirstImageProperties();

            // Step 5: Scroll down to the second image (girl in swimming pool) (Validate ER-4)
            await homePage.imageSection.scrollToSecondImage();

            // Step 6: Verify the second image is displayed correctly (Validate ER-5)
            await homePage.imageSection.verifySecondImageDisplayed();

            // Step 7: Inspect the second image properties and verify configured image properties (object-fit: cover, object-position: 50% 50%) (Validate ER-6)
            await homePage.imageSection.verifySecondImageProperties();

            // Step 8: Scroll through both image sections and observe their behavior (Validate ER-7)
            await homePage.imageSection.verifyScrollingBehavior();
        });
    },
);
