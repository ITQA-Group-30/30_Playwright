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

// Determine if running in CI environment
const isCI = process.env.CI === 'true';

BeforeAll(async function() {
    // Launch browser with environment-specific configurations
    browser = await chromium.launch({
        headless: isCI ? true : false,  // Force headless in CI
        slowMo: isCI ? 0 : 1000,        // Disable slowMo in CI
        args: [
            '--start-maximized',
            '--no-sandbox',              // Required for CI
            '--disable-setuid-sandbox',  // Required for CI
            '--disable-gpu'              // Optional: Better CI compatibility
        ]
    });
});

AfterAll(async function() {
    // Ensure browser cleanup
    if (browser) {
        await browser.close();
        browser = null;
    }
    // Clean up auth file
    try {
        await fs.unlink(config.authFile);
    } catch (error) {
        // Ignore if file doesn't exist
    }
});

// Helper function to perform initial login and save authentication state
async function performLogin(context, page) {
    try {
        await page.goto(config.baseURL + 'auth/login');
        await page.waitForLoadState('networkidle');

        // Login with credentials
        await page.getByPlaceholder('Username').fill(config.credentials.username);
        await page.getByPlaceholder('Password').fill(config.credentials.password);

        // Add extra wait for CI environment
        if (isCI) {
            await page.waitForTimeout(1000);
        }

        await page.getByRole('button', { name: 'Login' }).click();

        // Wait for successful login with more robust check
        await Promise.race([
            page.waitForURL('**/dashboard/index', { timeout: config.timeout }),
            page.waitForSelector('[class*="dashboard"]', { timeout: config.timeout })
        ]);

        // Store authentication state for reuse
        await context.storageState({ path: config.authFile });
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(`Login failed: ${error.message}`);
    }
}

Before({ timeout: config.timeout }, async function() {
    try {
        // Configure context with viewport and other settings
        const contextOptions = {
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        };

        // Add stored auth state if available
        try {
            await fs.access(config.authFile);
            contextOptions.storageState = config.authFile;
        } catch (error) {
            // File doesn't exist, will need to login
        }

        // Create new context with options
        this.context = await browser.newContext(contextOptions);
        this.page = await this.context.newPage();
        this.baseURL = config.baseURL;

        // Setup error handling
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                console.error('Page error:', msg.text());
            }
        });

        // If we don't have stored auth state, perform login
        if (!contextOptions.storageState) {
            await performLogin(this.context, this.page);
        } else {
            // Verify the session is still valid
            await this.page.goto(config.baseURL + 'dashboard/index');

            // Wait briefly for page load
            await this.page.waitForTimeout(1000);

            // If redirected to login, perform login again
            if (this.page.url().includes('auth/login')) {
                await performLogin(this.context, this.page);
            }
        }

    } catch (error) {
        console.error('Setup failed:', error);
        // Take screenshot on failure
        if (this.page) {
            const screenshot = await this.page.screenshot({
                path: `./test-results/setup-error-${Date.now()}.png`,
                fullPage: true
            });
        }
        throw error;
    }
});

After(async function() {
    // Take screenshot on test failure
    if (this.testCase.result.status === 'FAILED' && this.page) {
        await this.page.screenshot({
            path: `./test-results/failure-${this.testCase.pickle.name}-${Date.now()}.png`,
            fullPage: true
        });
    }

    // Clean up resources
    if (this.context) {
        await this.context.close();
        this.context = null;
    }
});