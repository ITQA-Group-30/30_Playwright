const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const DashboardPage = require('../src/pages/DashboardPage');

test.describe('Login Functionality', () => {
  let loginPage;
  let dashboardPage;

  // Before each test, create fresh page objects
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('Successful Login', async () => {
    // Arrange & Act
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Assert
    expect(await dashboardPage.isDashboardVisible()).toBeTruthy();
    const productCount = await dashboardPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Failed Login - Invalid Credentials', async () => {
    // Arrange & Act
    await loginPage.login('locked_out_user', 'wrong_password');
    
    // Assert
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Username and password do not match');
  });

  test('Logout Functionality', async () => {
    // Arrange & Act - Login
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Assert - Verify Dashboard
    expect(await dashboardPage.isDashboardVisible()).toBeTruthy();
    
    // Act - Logout
    await dashboardPage.logout();
    
    // Assert - Verify returned to login page
    expect(await loginPage.page.url()).toContain('saucedemo.com');
  });
});