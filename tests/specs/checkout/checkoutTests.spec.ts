import { test, expect } from '../testSetup';

test.describe('Checkout Process Tests', () => {
  test.beforeEach(async ({ sauceDemo }) => {
    await sauceDemo.goto();
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
  });

  test('verify checkout with empty cart', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByRole('link', { name: 'CHECKOUT' })).toBeDisabled();
  });

  test('verify checkout form validation', async ({ page, sauceDemo }) => {
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('verify successful checkout process', async ({ page, sauceDemo }) => {
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test('verify order summary details', async ({ page, sauceDemo }) => {
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('.summary_subtotal_label')).toContainText('29.99');
  });

  test('verify successful order completion', async ({ page, sauceDemo }) => {
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await page.getByRole('button', { name: 'FINISH' }).click();
    await expect(page.locator('.complete-header')).toContainText('THANK YOU');
  });

  test('verify cart total calculation', async ({ page }) => {
    await page.locator('.btn_inventory').first().click();
    await page.locator('.btn_inventory').nth(1).click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('.summary_total_label')).toBeVisible();
  });
});
