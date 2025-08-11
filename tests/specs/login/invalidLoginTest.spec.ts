import { test, expect } from '../testSetup';

test.describe('Invalid Login Tests', () => {
  test.beforeEach(async ({ sauceDemo }) => {
    await sauceDemo.goto();
  });

  test('verify login with invalid credentials', async ({ page, sauceDemo }) => {
    await sauceDemo.login("invalid_user", "invalid_password");
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});



