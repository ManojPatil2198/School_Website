import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Homepage Header & Navigation Test Suite', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });

    test('should load the homepage successfully', async ({ page }) => {
        await expect(page).toHaveURL(/.*united-school-of-tok\/home/);
    });

    test('should verify header and logo visibility', async ({ homePage }) => {
        await homePage.header.verifyHeaderVisible();
        await homePage.header.verifyLogoVisible();
    });

    test('should verify main navigation menu visibility', async ({ homePage }) => {
        await homePage.navigationMenu.verifyNavigationVisible();
    });

    test('should verify main navigation menu items are visible', async ({ homePage }) => {
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

    test('should open dropdown and verify submenu items', async ({ homePage }) => {
        await homePage.navigationMenu.openMenu('About UST');
        await homePage.navigationMenu.verifySubMenuVisible('UST Overview');
    });
});
