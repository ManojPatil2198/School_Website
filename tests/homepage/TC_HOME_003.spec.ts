import { test, expect } from '../../fixtures/test-fixtures';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Home Page', { tag: ['@smoke', '@regression'] }, () => {
    test('TC_HOME_003 - Verify Home page title', async ({ homePage }) => {
        await homePage.navigate();

        await expect(homePage.page).toHaveTitle(new RegExp(TEST_DATA.homepage.title, 'i'));
    });
});
