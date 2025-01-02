const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PIMPage = require('../../src/pages/PIMPage');

Given('I am on the PIM page', async function() {
    const pimPage = new PIMPage(this.page, this.baseURL);
    await pimPage.navigate('pim/viewEmployeeList');
    await this.page.waitForLoadState('networkidle');
    this.pimPage = pimPage;
});

When('I search for a employee {string}', async function(name) {
    await this.pimPage.searchEmployee(name);
});

Then('I should see employee records in the results', async function() {
    const count = await this.pimPage.getEmployeeCount();
    expect(count).toBeGreaterThan(0);
});