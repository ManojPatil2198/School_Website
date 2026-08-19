import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', () => {
    test("TC_NAV_005 - Validate navigating to 'School Life' page from Header", async ({
        homePage,
    }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Click on 'School Life' Header option
        await homePage.navigationMenu.clickMenuItem(
            TEST_DATA.homepage.navigationMenu.menuNames.schoolLife,
        );

        // Step 3: Verify user is taken to the intended 'School Life' page
        await expect(homePage.page).toHaveURL(/.*united-school-of-tok\/?$/);
    });
});
