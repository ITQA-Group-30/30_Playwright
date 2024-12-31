const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: false,
        slowMo: 1000 // Add delay between actions
    });
});

AfterAll(async function() {
    if (browser) {
        await browser.close();
    }
});

Before({ timeout: 30000 }, async function() {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/';

    // Navigate to login page
    await this.page.goto(this.baseURL + 'auth/login');

    // Wait for the page to load
    await this.page.waitForLoadState('networkidle');

    // Login
    await this.page.getByPlaceholder('Username').fill('Admin');
    await this.page.getByPlaceholder('Password').fill('admin123');
    await this.page.getByRole('button', { name: 'Login' }).click();

    // Wait for navigation to complete
    await this.page.waitForURL('**/dashboard/index', { timeout: 10000 });
});

After(async function() {
    if (this.context) {
        await this.context.close();
    }
});