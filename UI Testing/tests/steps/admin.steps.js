const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AdminPage = require('../../src/pages/AdminPage');

Given('I am on the admin page', async function() {
    const adminPage = new AdminPage(this.page, this.baseURL);
    await adminPage.navigate('admin/viewSystemUsers');
    await this.page.waitForLoadState('networkidle');
    this.adminPage = adminPage;
});

When('I search for user {string}', async function(username) {
    await this.adminPage.searchUser(username);
});

Then('I should see user records in the results', async function() {
    const count = await this.adminPage.getUserCount();
    expect(count).toBeGreaterThan(0);
});