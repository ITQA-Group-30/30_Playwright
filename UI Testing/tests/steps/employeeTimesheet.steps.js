const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TimesheetPage = require('../../src/pages/timePage');
const config = require('../../src/utils/config');

let timesheetPage;

Given('I am on the Time Sheet page', async function () {
    await this.page.goto(config.BASE_URL + config.ROUTES.TIMESHEET);
    timesheetPage = new TimesheetPage(this.page);
    this.timesheetPage = timesheetPage;
});

When('I search for a user {string}', async function (employeeName) {
    await this.timesheetPage.searchEmployee(employeeName);
});

Then('I click the "View" button', async function () {
    const viewButton = await this.page.locator('form').getByRole('button', { name: 'View' });
    await viewButton.waitFor({ state: 'visible' });  
    await viewButton.click();  
});