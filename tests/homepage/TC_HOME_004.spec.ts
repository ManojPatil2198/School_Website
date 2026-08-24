import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page - Header', { tag: ['@smoke', '@regression'] }, () => {
    test('TC_HOME_004 - Verify Header is visible', async ({ homePage }) => {
        await homePage.navigate();

        await expect(homePage.header.headerContainer).toBeVisible();
    });
});
