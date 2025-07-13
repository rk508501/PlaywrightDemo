# Playwright Test Automation Demo

This project demonstrates automated UI testing using Playwright with TypeScript. It includes a comprehensive test suite for the SauceDemo sample application with GitHub Actions CI/CD integration.

## Features

- Page Object Model design pattern
- Test organization by features
- Parallel test execution with sharding
- GitHub Actions integration
- Encrypted credentials handling
- Automated screenshot capture
- HTML test reports generation

## Test Categories

- Login Tests
  - Standard user login
  - Invalid credentials
  - Locked out user
- Product Tests
  - Sorting (price, name)
  - Product details
- Cart Tests
  - Add/remove items
  - Cart badge updates
- Checkout Tests
  - Form validation
  - Order summary
  - Complete purchase
- Menu Tests
  - Navigation
  - Logout
  - App state reset

## Setup

1. Clone the repository:
```bash
git clone https://github.com/rk508501/PlaywrightDemo.git
cd PlaywrightDemo
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
Create a `.env` file in the root directory and add:
```
SAUCEDEMO_PASSWORD=your_password_here
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test files:
```bash
npx playwright test tests/specs/login/      # Run login tests
npx playwright test tests/specs/cart/       # Run cart tests
npx playwright test tests/specs/checkout/   # Run checkout tests
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

## Test Reports

After test execution, HTML reports are available in the `playwright-report` directory:
```bash
npx playwright show-report
```

## CI/CD

The project uses GitHub Actions for continuous integration. On each push and pull request:
- Tests are run in parallel using 4 shards
- Test results are collected and merged
- HTML reports are generated and stored as artifacts

## Project Structure

```
├── .github/workflows/    # GitHub Actions workflow
├── pages/               # Page Object Models
├── tests/               # Test files
│   ├── specs/          # Organized test specs
│   │   ├── login/      # Login related tests
│   │   ├── products/   # Product related tests
│   │   ├── cart/       # Shopping cart tests
│   │   ├── checkout/   # Checkout process tests
│   │   └── menu/       # Menu navigation tests
├── utils/              # Utility functions
├── playwright.config.ts # Playwright configuration
└── package.json       # Project dependencies
```

## License

MIT
