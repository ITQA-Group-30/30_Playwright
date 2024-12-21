const { test, expect } = require('@playwright/test');
import {LoginPage} from '../src/pages/login'

// test('Login demo test 1', async ({ page }) => {
//     await page.goto('https://demo.applitools.com/');
//     // await page.pause();
//     await page.locator('[placeholder="Enter your username"]').fill('thilina');
//     await page.locator('[placeholder="Enter your password"]').fill('1234');
//     await page.locator('text=Sign in').click();
//     await page.locator('text=ACME').isVisible();

//     // await page.waitForSelector('text=Sign in', { timeout: 5000 })
//     // await page.waitForSelector('button:text("Sign in")', { timeout: 5000 });


//     await expect(page.locator('text=Sign in')).toHaveCount(0);
//       await page.pause();
// });

// test.only('Login demo test 2', async ({ page }) => {

//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php')
//     await page.pause();
//     await page.getByPlaceholder('Username').click();
//     await page.getByPlaceholder('Username').fill('Admin');
//     await page.getByPlaceholder('Password').click();
//     await page.getByPlaceholder('Password').fill('admin123');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.locator('span').filter({ hasText: 'manda user' }).click();
//     await page.getByRole('menuitem', { name: 'Logout' }).click();
   

//  });


test('test', async ({ page }) => {

    const Login = new LoginPage(page)
  
    await Login.gotoLoginPage()
    await Login.login('thilina', '1234')
  
    // await page.goto('https://the-internet.herokuapp.com/login');
    // await page.getByLabel('Username').click();
    // await page.getByLabel('Username').fill('thilina');
    // await page.getByLabel('Password').click();
    // await page.getByLabel('Password').fill('1234');
    // await page.getByRole('button', { name: ' Login' }).click();
  });