import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', { tag: ['@regression', '@visual'] }, () => {
    test('TC_NAV_009 - Validate Header navigation is usable in mobile view', async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL & refresh
        await homePage.navigate();
        await homePage.page.reload();

        // Step 2: Open the mobile Header/navigation option (Validate ER-1)
        await expect(homePage.header.headerContainer).toBeVisible();
        await expect(homePage.navigationMenu.navContainer).toBeVisible();

        // Step 3: Check the displayed navigation options (Validate ER-2)
        await expect(homePage.navigationMenu.navContainer).toBeVisible();
        await expect(
            homePage.navigationMenu.getMenuItem(
                TEST_DATA.homepage.navigationMenu.menuNames.aboutUst,
            ),
        ).toBeVisible();
    });
});
