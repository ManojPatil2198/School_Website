import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page - Header', () => {
    test('TC_HOME_004 - Verify Header is visible', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.header.verifyHeaderVisible();
    });
});
