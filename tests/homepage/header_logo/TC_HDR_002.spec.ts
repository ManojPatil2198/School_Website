import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Header', { tag: ['@smoke', '@regression', '@visual'] }, () => {
    test('TC_HDR_002 - Validate United School of Tokyo logo is displayed and clickable', async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2 & Step 3: Locate and verify the UST logo in the Header is displayed (Validate ER-1 & ER-2)
        await homePage.header.verifyHeaderVisible();
        await homePage.header.verifyLogoVisible();

        // Step 4: Verify the logo loads without a broken-image indication (Validate ER-3)
        await homePage.header.verifyLogoImageLoaded();

        // Step 5: Verify the logo is properly aligned and positioned within the Header (Validate ER-4)
        await homePage.header.verifyLogoAlignment();

        // Step 6: Verify the logo is not distorted, stretched, clipped, or overlapped (Validate ER-5)
        await homePage.header.verifyLogoLayout();

        // Step 7: Click the UST logo (Validate ER-6)
        await homePage.header.clickLogo();

        // Step 8: Verify the user is navigated to the intended Home page destination (Validate ER-7)
        await expect(homePage.page).not.toHaveTitle(/404|Error/i);
    });
});
