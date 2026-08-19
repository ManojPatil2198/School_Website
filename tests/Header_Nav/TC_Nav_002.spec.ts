import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_002 - Verify main navigation menu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        const mainMenuItems = Object.values(TEST_DATA.homepage.navigationMenu.menuNames);

        for (const item of mainMenuItems) {
            await expect(homePage.navigationMenu.getMenuItem(item)).toBeVisible();
        }
    });
});
