const {test, expect} = require('@playwright/test');

test('205009E_chaami', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    const pageTitle = page.title();
    console.log(pageTitle);

    const pageURL = page.url();
    console.log(pageURL);

    // Validate the page title
    await expect(page).toHaveTitle('Swag Labs');
    // Validate the page URL
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await page.close();

});
