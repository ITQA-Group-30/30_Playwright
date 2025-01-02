const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LeavePage = require('../../src/pages/LeavePage');

Given('I am on the leave page', async function() {
    const leavePage = new LeavePage(this.page, this.baseURL);
    await leavePage.navigate('leave/viewLeaveList');
    await this.page.waitForLoadState('networkidle');
    this.leavePage = leavePage;
});

When('I search for leave requests', async function() {
    await this.leavePage.searchLeaveRequests();
});

Then('I should see leave records in the results', async function() {
    const count = await this.leavePage.getLeaveRequestCount();
    expect(count).toBeGreaterThan(0);
});