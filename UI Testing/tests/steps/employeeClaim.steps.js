const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ClaimPage = require('../../src/pages/claimPage');
const config = require('../../src/utils/config');

let claimPage;

Given('I am on the Employee Claim page', async function () {
    await this.page.goto(config.BASE_URL + config.ROUTES.CLAIM);
    claimPage = new ClaimPage(this.page);
});

When('I search for employee {string} with reference ID {string}', async function (employeeName, referenceId) {

    console.log('Filling in employee name...');
    await this.page.getByPlaceholder('Type for hints...').first().click();
    await this.page.getByPlaceholder('Type for hints...').first().fill(employeeName);

    console.log('Filling in reference ID...');
    await this.page.getByPlaceholder('Type for hints...').nth(1).click();
    await this.page.getByPlaceholder('Type for hints...').nth(1).fill(referenceId);
});


When('I select event name and status', { timeout: 150000 }, async function () {
    console.log('Selecting event name and status...');

    // Select Event Name
    await this.page.locator('form i').first().waitFor({ state: 'visible' });
    await this.page.locator('form i').first().click();
    await this.page.getByRole('option', { name: 'Accommodation' }).click();

    // Select Status
    await this.page.locator('form i').nth(1).waitFor({ state: 'visible' });
    await this.page.locator('form i').nth(1).click();
    await this.page.getByRole('option', { name: 'Initiated' }).click();
});


Then('the search results should display relevant data', async function () {
    console.log('Waiting for and clicking the "Search" button...');
    await this.page.getByRole('button', { name: 'Search', exact: true }).waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'Search' }).click();
});


