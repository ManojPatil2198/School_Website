import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Homepage Spec Suite', () => {
    test('should navigate to the homepage successfully', async ({ homePage, page }) => {
        await homePage.navigate();
        await expect(page).toHaveURL(/.*united-school-of-tok\/home/);
    });
});
