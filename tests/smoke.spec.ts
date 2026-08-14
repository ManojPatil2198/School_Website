import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Smoke Test Suite', () => {
  test('should open the homepage successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await expect(page).toHaveURL(/.*united-school-of-tok\/home/);
  });
});
