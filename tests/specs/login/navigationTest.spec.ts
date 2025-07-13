import { test, expect } from '../testSetup';
import { encrypt, decrypt } from '../../../utils/encryption';

test.describe('Login Navigation', () => {
  test.beforeEach(async ({ sauceDemo }) => {
    await sauceDemo.goto();
  });

  test('navigate to saucedemo login page', async ({ page, sauceDemo }) => {
    const originalPassword = process.env.SAUCEDEMO_PASSWORD || '';
    const encryptedPassword = encrypt(originalPassword);
    const decryptedPassword = decrypt(encryptedPassword);
    
    await sauceDemo.login("standard_user", decryptedPassword);
    await page.screenshot({ path: 'screenshots/02-after-login.png', fullPage: true });
    await sauceDemo.selectBackpack();
    await page.screenshot({ path: 'screenshots/03-backpack-selected.png', fullPage: true });

    await expect(page.getByRole("link", { name: "Sauce Labs Backpack" })).toBeVisible();
    await expect(page.locator("#item_4_title_link")).toContainText("Sauce Labs Backpack");

    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.screenshot({ path: 'screenshots/04-checkout-page.png', fullPage: true });
    await page.locator('[data-test="firstName"]').click();
    await expect(page.getByRole('button', { name: 'CONTINUE' })).toBeVisible();
  });
});
