import { test, expect } from '../testSetup';

test.describe('Menu Navigation Tests', () => {
  test.beforeEach(async ({ sauceDemo }) => {
    await sauceDemo.goto();
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
  });

  test('verify menu button functionality', async ({ page }) => {
    await page.locator('.bm-burger-button').click();
    await expect(page.locator('.bm-menu')).toBeVisible();
  });

  test('verify about link in menu', async ({ page }) => {
    await page.locator('.bm-burger-button').click();
    await expect(page.locator('.bm-menu')).toContainText('About');
  });

  test('verify logout functionality', async ({ page }) => {
    await page.locator('.bm-burger-button').click();
    await page.getByText('Logout').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('verify reset app state functionality', async ({ page, sauceDemo }) => {
    await sauceDemo.selectBackpack();
    await page.locator('.bm-burger-button').click();
    await page.getByText('Reset App State').click();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });
});
