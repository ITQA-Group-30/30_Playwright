const { test, expect } = require('@playwright/test');

test('205009E_chaami', async ({ page }) => {
    await page.goto('https://demoblaze.com/index.html');

    const pageTitle = await page.title();
    console.log(pageTitle);

    const pageURL = page.url();
    console.log(pageURL);

    // Validate the page title
    await expect(page).toHaveTitle('STORE');
    // Validate the page URL
    await expect(page).toHaveURL('https://demoblaze.com/index.html');

    // Click on the "login" button
    await page.click('#login2');
    // Enter username
    await page.fill('#loginusername', 'pavanol');
    // Enter password
    await page.fill('#loginpassword', 'test@123');
    // Click on the "log in" button
    await page.click("//button[contains(., 'Log in')]");
    // Wait for navigation or dynamic UI update
    await page.waitForSelector('#logout2', { state: 'visible'});

    // Verify if the logout link is displayed
    const logoutLink = await page.locator('#logout2');
    await expect(logoutLink).toBeVisible();

    await page.close();
});
