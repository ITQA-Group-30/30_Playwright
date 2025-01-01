const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs').promises;
const path = require('path');
const CONFIG = require('../../src/utils/config');

// Store global variables
let browser;
let authContext;

// Configuration object for easier maintenance
const config = {
    baseURL: CONFIG.BASE_URL,
    authFile: path.join(process.cwd(), 'auth.json'),
    credentials: {
        username: CONFIG.CREDENTIALS.ADMIN.USERNAME,
        password: CONFIG.CREDENTIALS.ADMIN.PASSWORD
    },
    timeout: 30000
};

BeforeAll(async function() {
    // Launch browser with specific configurations
    browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: ['--start-maximized']
    });
});

AfterAll(async function() {
    // Ensure browser cleanup
    if (browser) {
        await browser.close();
        browser = null;
    }
});

// Helper function to perform initial login and save authentication state
async function performLogin(context, page) {
    await page.goto(config.baseURL + 'auth/login');
    await page.waitForLoadState('networkidle');

    // Login with credentials
    await page.getByPlaceholder('Username').fill(config.credentials.username);
    await page.getByPlaceholder('Password').fill(config.credentials.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for successful login
    await page.waitForURL('**/dashboard/index', { timeout: config.timeout });

    // Store authentication state for reuse
    await context.storageState({ path: config.authFile });
}

Before({ timeout: config.timeout }, async function() {
    try {
        // Check if we have a stored authentication state
        let contextOptions = {};

        try {
            await fs.access(config.authFile);
            contextOptions.storageState = config.authFile;
        } catch (error) {
            // File doesn't exist, will need to login
        }

        // Create new context with stored auth state if available
        this.context = await browser.newContext(contextOptions);
        this.page = await this.context.newPage();
        this.baseURL = config.baseURL;

        // If we don't have stored auth state, perform login
        if (!contextOptions.storageState) {
            await performLogin(this.context, this.page);
        } else {
            // Verify the session is still valid by accessing a protected page
            await this.page.goto(config.baseURL + 'dashboard/index');

            // If redirected to login, perform login again
            if (this.page.url().includes('auth/login')) {
                await performLogin(this.context, this.page);
            }
        }

    } catch (error) {
        console.error('Setup failed:', error);
        throw error;
    }
});

After(async function() {
    // Clean up resources
    if (this.context) {
        await this.context.close();
        this.context = null;
    }
});