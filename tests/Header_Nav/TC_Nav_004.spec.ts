import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_004 - Verify all Learning submenu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.navigationMenu.openMenu(
            TEST_DATA.homepage.navigationMenu.menuNames.learning,
        );

        const submenuItems = TEST_DATA.homepage.navigationMenu.learningSubmenu;

        for (const item of submenuItems) {
            await expect(homePage.navigationMenu.getSubMenuItem(item)).toBeVisible({
                timeout: 10000,
            });
        }
    });
});
