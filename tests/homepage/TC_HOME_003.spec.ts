import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page', () => {
    test('TC_HOME_003 - Verify Home page title', async ({ homePage }) => {
        await homePage.navigate();

        const title = await homePage.getTitle();

        expect(title).toBeTruthy();
    });
});
