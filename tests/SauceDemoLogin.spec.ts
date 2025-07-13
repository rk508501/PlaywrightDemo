import { test, expect } from "@playwright/test";
import { SauceDemoLoginPage } from "../pages/SauceDemo";
import * as dotenv from 'dotenv';
import { encrypt, decrypt } from '../utils/encryption';

dotenv.config();

test.describe('SauceDemo E2E Tests', () => {
  let sauceDemo: SauceDemoLoginPage;

  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemoLoginPage(page);
    await sauceDemo.goto();
  });

  test("navigate to saucedemo login page", async ({ page }) => {
    // Encrypt the password from .env and use it in the test
    const originalPassword = process.env.SAUCEDEMO_PASSWORD || '';
    console.log('Original password from .env:', originalPassword);
    const encryptedPassword = encrypt(originalPassword);
    console.log('Encrypted password:', encryptedPassword);
    const decryptedPassword = decrypt(encryptedPassword);
    console.log('Decrypted password:', decryptedPassword);
    await sauceDemo.login("standard_user", decryptedPassword);
    await page.screenshot({ path: 'screenshots/02-after-login.png', fullPage: true });
    await sauceDemo.selectBackpack();
    await page.screenshot({ path: 'screenshots/03-backpack-selected.png', fullPage: true });

    await expect(
      page.getByRole("link", { name: "Sauce Labs Backpack" })
    ).toBeVisible();
    await expect(page.locator("#item_4_title_link")).toContainText(
      "Sauce Labs Backpack"
    );

    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.screenshot({ path: 'screenshots/04-checkout-page.png', fullPage: true });
    await page.locator('[data-test="firstName"]').click();
    await expect(page.getByRole('button', { name: 'CONTINUE' })).toBeVisible();
  });

  test("verify login with invalid credentials", async ({ page }) => {
    await sauceDemo.login("invalid_user", "invalid_password");
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test("verify login with locked out user", async ({ page }) => {
    await sauceDemo.login("locked_out_user", "secret_sauce");
    await expect(page.locator('[data-test="error"]')).toContainText("locked out");
  });

  test("verify product sorting - price low to high", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('[data-test="product_sort_container"]').selectOption('lohi');
    await expect(page.locator('.inventory_item_price').first()).toContainText('$7.99');
  });

  test("verify product sorting - price high to low", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
    await expect(page.locator('.inventory_item_price').first()).toContainText('$49.99');
  });

  test("verify product sorting - name A to Z", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('[data-test="product_sort_container"]').selectOption('az');
    await expect(page.locator('.inventory_item_name').first()).toContainText('Sauce Labs Backpack');
  });

  test("verify product sorting - name Z to A", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('[data-test="product_sort_container"]').selectOption('za');
    await expect(page.locator('.inventory_item_name').first()).toContainText('Test.allTheThings()');
  });

  test("verify shopping cart badge updates", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test("verify remove item from cart", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await sauceDemo.selectBackpack();
    await page.locator('.cart_button').click();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });

  test("verify checkout with empty cart", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByRole('link', { name: 'CHECKOUT' })).toBeDisabled();
  });

  test("verify checkout form validation", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test("verify successful checkout process", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test("verify order summary details", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.locator('.summary_subtotal_label')).toContainText('29.99');
  });

  test("verify successful order completion", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await sauceDemo.selectBackpack();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await page.getByRole('button', { name: 'FINISH' }).click();
    await expect(page.locator('.complete-header')).toContainText('THANK YOU');
  });

  test("verify menu button functionality", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('.bm-burger-button').click();
    await expect(page.locator('.bm-menu')).toBeVisible();
  });

  test("verify about link in menu", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('.bm-burger-button').click();
    await expect(page.locator('.bm-menu')).toContainText('About');
  });

  test("verify logout functionality", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('.bm-burger-button').click();
    await page.getByText('Logout').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test("verify reset app state functionality", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await sauceDemo.selectBackpack();
    await page.locator('.bm-burger-button').click();
    await page.getByText('Reset App State').click();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });

  test("verify multiple items in cart", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
    await page.locator('.btn_inventory').first().click();
    await page.locator('.btn_inventory').nth(1).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test("verify cart total calculation", async ({ page }) => {
    await sauceDemo.login("standard_user", process.env.SAUCEDEMO_PASSWORD || '');
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
