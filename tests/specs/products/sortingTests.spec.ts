import { test, expect } from '../testSetup';

test.describe('Product Sorting Tests', () => {
  test.beforeEach(async ({ sauceDemo }) => {
    await sauceDemo.goto();
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
  });

  test('verify product sorting - price low to high', async ({ page }) => {
    await page.locator('[data-test="product_sort_container"]').selectOption('lohi');
    await expect(page.locator('.inventory_item_price').first()).toContainText('$7.99');
  });

  test('verify product sorting - price high to low', async ({ page }) => {
    await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
    await expect(page.locator('.inventory_item_price').first()).toContainText('$49.99');
  });

  test('verify product sorting - name A to Z', async ({ page }) => {
    await page.locator('[data-test="product_sort_container"]').selectOption('az');
    await expect(page.locator('.inventory_item_name').first()).toContainText('Sauce Labs Backpack');
  });

  test('verify product sorting - name Z to A', async ({ page }) => {
    await page.locator('[data-test="product_sort_container"]').selectOption('za');
    await expect(page.locator('.inventory_item_name').first()).toContainText('Test.allTheThings()');
  });
});
