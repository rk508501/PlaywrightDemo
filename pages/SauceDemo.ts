import { Page, Locator } from '@playwright/test';

export class SauceDemoLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly backpackLink: Locator;
  readonly backpackAddToCartButton: Locator;
  readonly cartLink: Locator;
  readonly backpackTitleLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
    this.backpackLink = page.getByText('Sauce Labs Backpackcarry.');
    this.backpackAddToCartButton = page
      .locator('div')
      .filter({ hasText: /^\$29\.99ADD TO CART$/ })
      .getByRole('button');
    this.cartLink = page.getByRole('link', { name: '1' });
    this.backpackTitleLink = page.locator('#item_4_title_link');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
    await this.usernameInput.press('Tab');
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async selectBackpack() {
    await this.backpackLink.click();
    await this.backpackAddToCartButton.click();
    await this.cartLink.click();
  }
}