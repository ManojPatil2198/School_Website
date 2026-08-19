import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_004 - Verify all Learning submenu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.navigationMenu.openMenu('Learning');

        const submenuItems = [
            'Curriculum',
            'Early Years Program',
            'Elementary School',
            'Extra Curricular',
            'Middle School',
        ];

        for (const item of submenuItems) {
            await homePage.navigationMenu.verifySubMenuVisible(item);
        }
    });
});
