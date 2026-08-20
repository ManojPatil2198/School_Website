import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Home Page', { tag: ['@smoke', '@regression'] }, () => {
    test('TC_HOME_001 - Verify correct Home page URL is displayed', async ({ homePage }) => {
        await homePage.navigate();

        await expect(homePage.page).toHaveURL(/.*united-school-of-tok\/home/);
    });
});
