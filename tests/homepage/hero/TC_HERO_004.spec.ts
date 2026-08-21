import { test } from '../../../fixtures/test-fixtures';

test.describe('Home Page - Hero Section', { tag: ['@regression', '@visual'] }, () => {
    test('TC_HERO_004 - Validate Hero responsive layout', async ({ homePage }) => {
        // Step 1: Open the Application URL
        await homePage.navigate();

        // Step 2: Verify Hero section responsive layout
        await homePage.heroSlider.verifyResponsiveLayout('desktop');
    });
});
