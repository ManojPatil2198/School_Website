import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', () => {
    test("TC_NAV_006 - Validate navigating to 'Admissions' page/functionality from Header", async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Click on 'Admissions' Header option
        await homePage.navigationMenu.clickMenuItem(
            TEST_DATA.homepage.navigationMenu.menuNames.admissions,
        );

        // Step 3: Verify intended Admissions page/functionality is displayed successfully
        await expect(
            homePage.navigationMenu.getMenuItem(
                TEST_DATA.homepage.navigationMenu.menuNames.admissions,
            ),
        ).toBeVisible();
        await expect(homePage.page).toHaveURL(/.*united-school-of-tok/);
    });
});
