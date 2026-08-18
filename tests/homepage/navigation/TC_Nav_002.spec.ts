import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_NAV_002 - Verify main navigation menu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        const mainMenuItems = [
            'About UST',
            'Learning',
            'School Life',
            'Admissions',
            'Summer School',
            'Employment',
        ];

        for (const item of mainMenuItems) {
            await homePage.navigationMenu.verifyMenuItemVisible(item);
        }
    });
});
