import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page - Footer', () => {
    test('TC_FTR_006 - Validate Footer in mobile view', async ({ page, homePage }) => {
        // Step 1: Enable a mobile viewport (390x844) & Open the Application URL
        await page.setViewportSize({ width: 390, height: 844 });
        await homePage.navigate();

        // Step 2: Refresh the Home page
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Step 3: Scroll to the Footer (Validate ER-1)
        await homePage.footer.scrollToFooter();
        await homePage.footer.verifyFooterDisplayed();

        // Step 4: Check all Footer sections and links (Validate ER-2)
        await homePage.footer.verifyMobileFooterLayout();
        await homePage.footer.verifyESCampusInformationDisplayed();
        await homePage.footer.verifyESCampusContactDetails();
        await homePage.footer.verifyMSCampusInformationDisplayed();
        await homePage.footer.verifyMSCampusContactDetails();
        await homePage.footer.verifyQuickLinksSectionDisplayed();
        await homePage.footer.verifyCopyrightInformationDisplayed();
    });
});
