import { test } from '../../fixtures/test-fixtures';

test.describe('Home Page', () => {
    test('TC_HOME_002 - Verify Home page loads successfully', async ({ homePage }) => {
        await homePage.navigate();

        await homePage.header.verifyLogoVisible();
    });
});
