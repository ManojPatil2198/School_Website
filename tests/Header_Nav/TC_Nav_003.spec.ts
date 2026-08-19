import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_003 - Verify all About UST submenu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.navigationMenu.openMenu(
            TEST_DATA.homepage.navigationMenu.menuNames.aboutUst,
        );

        const submenuItems = TEST_DATA.homepage.navigationMenu.aboutUstSubmenu;

        for (const item of submenuItems) {
            await expect(homePage.navigationMenu.getSubMenuItem(item)).toBeVisible({
                timeout: 10000,
            });
        }
    });
});
