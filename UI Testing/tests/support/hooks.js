const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs').promises;
const path = require('path');
const CONFIG = require('../../src/utils/config');

// Global variables for browser and authentication context
let browser;

const config = {
    baseURL: CONFIG.BASE_URL,
    authFile: path.join(process.cwd(), 'auth.json'),
    credentials: {
        username: CONFIG.CREDENTIALS.ADMIN.USERNAME,
        password: CONFIG.CREDENTIALS.ADMIN.PASSWORD,
    },
    timeout: 30000,
};

// Helper function to perform login and save auth state
async function performLogin(context, page) {
    try {
        await page.goto(config.baseURL + 'auth/login');
        await page.waitForLoadState('networkidle');

        // Enter credentials and submit the login form
        await page.getByPlaceholder('Username').fill(config.credentials.username);
        await page.getByPlaceholder('Password').fill(config.credentials.password);
        await page.getByRole('button', { name: 'Login' }).click();

        // Ensure successful navigation to the dashboard
        await page.waitForURL('**/dashboard/index', { timeout: config.timeout });

        // Save authentication state
        await context.storageState({ path: config.authFile });
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

BeforeAll(async function () {
    try {
        // Launch browser with required configurations
        console.log('Launching browser...');
        browser = await chromium.launch({
            headless: false,
            slowMo: 1000,
            args: ['--start-maximized'],
        });
        console.log('Browser launched successfully.');
    } catch (error) {
        console.error('Error during browser launch:', error);
        throw error;
    }
});

AfterAll(async function () {
    try {
        // Ensure the browser is closed properly
        if (browser) {
            console.log('Closing browser...');
            await browser.close();
            console.log('Browser closed successfully.');
        }
    } catch (error) {
        console.error('Error during browser cleanup:', error);
    }
});

// Runs before each scenario
Before({ timeout: config.timeout }, async function () {
    try {
        console.log('Setting up test context...');

        let contextOptions = {};
        try {
            // Check if auth state exists
            await fs.access(config.authFile);
            contextOptions.storageState = config.authFile;
        } catch {
            console.log('Auth state not found; login required.');
        }

        // Create a new browser context
        this.context = await browser.newContext(contextOptions);
        this.page = await this.context.newPage();
        this.baseURL = config.baseURL;

        // Perform login if auth state is not available
        if (!contextOptions.storageState) {
            await performLogin(this.context, this.page);
        } else {
            // Verify session validity
            await this.page.goto(config.baseURL + 'dashboard/index');
            if (this.page.url().includes('auth/login')) {
                console.log('Session expired; re-logging...');
                await performLogin(this.context, this.page);
            }
        }

        console.log('Test context setup complete.');
    } catch (error) {
        console.error('Error during test setup:', error);
        throw error;
    }
});

// Runs after each scenario
After(async function () {
    try {
        if (this.context) {
            console.log('Closing context...');
            await this.context.close();
            console.log('Context closed successfully.');
        }
    } catch (error) {
        console.error('Error during context cleanup:', error);
    } finally {
        this.context = null;
        this.page = null;
    }
});
