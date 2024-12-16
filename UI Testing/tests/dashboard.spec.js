const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const DashboardPage = require('../src/pages/DashboardPage');

test.describe('Dashboard Functionality', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    // Login before each test
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Verify Product Listing', async () => {
    // Assert products are displayed
    const productCount = await dashboardPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Open Shopping Cart', async () => {
    // Act
    await dashboardPage.openShoppingCart();
    
    // Assert
    expect(await dashboardPage.page.url()).toContain('/cart.html');
  });
});