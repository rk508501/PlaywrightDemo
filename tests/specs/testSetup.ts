import { test as base } from '@playwright/test';
import { SauceDemoLoginPage } from '../../pages/SauceDemo';
import * as dotenv from 'dotenv';

dotenv.config();

// Extend the test type to include our page fixture
export const test = base.extend<{ sauceDemo: SauceDemoLoginPage }>({
  sauceDemo: async ({ page }, use) => {
    const sauceDemo = new SauceDemoLoginPage(page);
    await use(sauceDemo);
  },
});

export { expect } from '@playwright/test';
