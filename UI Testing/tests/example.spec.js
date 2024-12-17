// // @ts-check
// const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


const { test, expect } = require('@playwright/test');

test.describe('OrangeHRM Login Page', () => {
  // Test for Login Form UI Elements
  test('Check OrangeHRM login form UI elements', async ({ page }) => {
    // Step 1: Navigate to OrangeHRM demo login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // Wait for the login form to be visible
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible({ timeout: 10000 });
    
    // Step 2: Check username input
    const usernameInput = page.locator('input[name="username"]');
    await expect(usernameInput).toBeVisible();
    
    // Step 3: Check password input
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    
    // Step 4: Check login button
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
    
    // Optional: Additional UI checks
    await expect(page.locator('.orangehrm-login-logo')).toBeVisible();
  });

  // Test for Successful Login
  test('Login with valid credentials', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // Step 2: Fill in credentials
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    
    // Step 3: Click login button
    await page.locator('button[type="submit"]').click();
    
    // Step 4: Wait for dashboard to load
    await page.waitForURL('**/web/index.php/dashboard/index');
    
    // Step 5: Verify dashboard elements
    const dashboardHeader = page.locator('h6.oxd-topbar-header-breadcrumb-module');
    await expect(dashboardHeader).toBeVisible({ timeout: 10000 });
    await expect(dashboardHeader).toContainText('Dashboard');
    
    // Optional: Check user menu is visible
    const userMenu = page.locator('.oxd-userdropdown-tab');
    await expect(userMenu).toBeVisible();
  });

  // Test for Failed Login
  test('Login with invalid credentials', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // Step 2: Fill in invalid credentials
    await page.locator('input[name="username"]').fill('InvalidUser');
    await page.locator('input[name="password"]').fill('WrongPassword');
    
    // Step 3: Click login button
    await page.locator('button[type="submit"]').click();
    
    // Step 4: Verify error message
    const errorMessage = page.locator('.oxd-alert-content-text');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
    await expect(errorMessage).toContainText('Invalid credentials');
    
    // Verify still on login page
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});productCount