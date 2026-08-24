import { test } from '../../../fixtures/test-fixtures';

test.describe(
    'Home Page - Welcome to UST Section',
    { tag: ['@smoke', '@regression', '@visual'] },
    () => {
        test('TC_WTUST_001 - Validate Welcome to UST section is displayed on Home page', async ({
            homePage,
        }) => {
            // Step 1: Open the Application URL
            await homePage.navigate();

            // Step 2: Scroll to the 'Welcome to UST' section (Validate ER-1)
            await homePage.welcomeToUST.scrollToSection();
            await homePage.welcomeToUST.verifyWelcomeSectionVisible();

            // Step 3: Verify the heading 'Welcome to the United School of Tokyo' is displayed (Validate ER-2)
            await homePage.welcomeToUST.verifyHeadingVisible();

            // Step 4: Verify the tagline 'International School with a Conscience' is displayed (Validate ER-3)
            await homePage.welcomeToUST.verifyTaglineVisible();

            // Step 5: Verify the displayed image/content area (Validate ER-4)
            await homePage.welcomeToUST.verifySectionImageLoaded();

            // Step 6: Verify the section content is readable and properly aligned (Validate ER-5)
            await homePage.welcomeToUST.verifySectionLayout();
        });
    },
);
