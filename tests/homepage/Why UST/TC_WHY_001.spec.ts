import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Why UST', () => {
    test('TC_WHY_001 - Verify Why UST section is visible', async ({ homePage }) => {
        // Step 1: Navigate to Home page
        await homePage.navigate();

        // Step 2: Verify Why UST section is visible
        await expect(homePage.whyUST.whyUstSection).toBeVisible();
    });
});
