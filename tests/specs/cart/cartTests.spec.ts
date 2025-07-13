import { test, expect } from '../testSetup';

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ sauceDemo }) => {
    await sauceDemo.goto();
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
  });

  test('verify shopping cart badge updates', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('verify remove item from cart', async ({ page, sauceDemo }) => {
    await sauceDemo.selectBackpack();
    await page.locator('.cart_button').click();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });

  test('verify multiple items in cart', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await page.locator('.btn_inventory').nth(1).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
});
