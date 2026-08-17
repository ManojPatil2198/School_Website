import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Navigation Menu', () => {
    test('TC_HOME_002 - Verify main navigation menu items are visible', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.navigationMenu.verifyMenuItemVisible('About UST');
        await homePage.navigationMenu.verifyMenuItemVisible('Learning');
        await homePage.navigationMenu.verifyMenuItemVisible('School Life');
        await homePage.navigationMenu.verifyMenuItemVisible('Admissions');
        await homePage.navigationMenu.verifyMenuItemVisible('Summer School');
        await homePage.navigationMenu.verifyMenuItemVisible('Employment');
    });
});
