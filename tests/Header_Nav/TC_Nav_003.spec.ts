import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_003 - Verify all About UST submenu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.navigationMenu.openMenu('About UST');

        const submenuItems = ['UST Overview', 'Founding Principals', 'School Governance'];

        for (const item of submenuItems) {
            await homePage.navigationMenu.verifySubMenuVisible(item);
        }
    });
});
