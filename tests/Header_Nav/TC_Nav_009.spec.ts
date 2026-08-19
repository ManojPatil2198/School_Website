import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_009 - Validate Header navigation is usable in mobile view', async ({
        homePage,
    }) => {
        // Step 1: Set mobile viewport (390x844)
        await homePage.page.setViewportSize({ width: 390, height: 844 });

        // Step 2: Open the Application URL & refresh
        await homePage.navigate();
        await homePage.page.reload();

        // Step 3: Open the mobile Header/navigation option (Validate ER-1)
        await homePage.header.verifyHeaderVisible();
        await homePage.navigationMenu.verifyNavigationVisible();

        // Step 4: Check the displayed navigation options (Validate ER-2)
        await expect(homePage.navigationMenu.navContainer).toBeVisible();
        await homePage.navigationMenu.verifyMenuItemVisible('About UST');
    });
});
