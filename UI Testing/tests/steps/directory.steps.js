const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DirectoryPage = require('../../src/pages/DirectoryPage');

Given('I am on the directory page', async function() {
    const directoryPage = new DirectoryPage(this.page, this.baseURL);
    await directoryPage.navigate('directory/viewDirectory');
    await this.page.waitForLoadState('networkidle');
    // Store directoryPage in the world object so other steps can access it
    this.directoryPage = directoryPage;
});

When('I search for employee {string}', async function(name) {
    await this.directoryPage.searchEmployee(name);
});

Then('I should see employee cards in the results', async function() {
    const count = await this.directoryPage.getEmployeeCount();
    expect(count).toBeGreaterThan(0);
});