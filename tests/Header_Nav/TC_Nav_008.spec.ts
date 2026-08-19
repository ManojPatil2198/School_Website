import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', () => {
    test("TC_NAV_008 - Validate navigating to 'Employment' page from Header", async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Click on 'Employment' Header option
        await homePage.navigationMenu.clickMenuItem(
            TEST_DATA.homepage.navigationMenu.menuNames.employment,
        );

        // Step 3: Verify user is taken to the intended 'Employment' page
        await expect(homePage.page).toHaveURL(/.*about-3/i);
    });
});
