// tests/steps/performanceReviewSteps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PerformancePage = require('../../src/pages/performancePage');
const config = require('../../src/utils/config');

let performancePage;

Given('I am on the Performance Review page', async function () {
    await this.page.goto(config.BASE_URL + config.ROUTES.PERFORMANCE);
    performancePage = new PerformancePage(this.page);
});

When('I select the employee name {string}', async function (employeeName) {
  
    await this.page.getByPlaceholder('Type for hints...').waitFor({ state: 'visible' });
    await this.page.getByPlaceholder('Type for hints...').click();


    await this.page.getByPlaceholder('Type for hints...').fill(employeeName);
});

Then('I select the default From date and To date', async function () {

    await this.page.locator('input[placeholder="yyyy-dd-mm"]').first().click(); 
    await this.page.locator('.oxd-date-input > .oxd-icon').first().click(); 

 
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear().toString();

    await this.page.getByText(currentYear, { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByText(currentYear, { exact: true }).click();
    await this.page.getByText(currentMonth, { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByText(currentMonth, { exact: true }).click();


    const currentDay = new Date().getDate().toString();
    await this.page.getByText(currentDay, { exact: true }).waitFor({ state: 'visible', timeout: 50000 });
    await this.page.getByText(currentDay, { exact: true }).click();

 
    await this.page.locator('input[placeholder="yyyy-dd-mm"]').nth(1).click(); 
    await this.page.locator('.oxd-date-input > .oxd-icon').nth(1).click(); 

 
    await this.page.getByText(currentYear, { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByText(currentYear, { exact: true }).click();
    await this.page.getByText(currentMonth, { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByText(currentMonth, { exact: true }).click();


    await this.page.getByText(currentDay, { exact: true }).waitFor({ state: 'visible', timeout: 50000 });
    await this.page.getByText(currentDay, { exact: true }).click();
});



