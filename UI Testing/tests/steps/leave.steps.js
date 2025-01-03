const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LeavePage = require('../../src/pages/LeavePage');

Given('I am on the leave page', { timeout: 30000 }, async function() {
    try {
        const leavePage = new LeavePage(this.page, this.baseURL);
        await leavePage.navigate('leave/viewLeaveList');
        await this.page.waitForLoadState('networkidle');
        this.leavePage = leavePage;
    } catch (error) {
        console.error('Error navigating to leave page:', error);
        throw error;
    }
});

When('I filter leave requests with the following criteria:', { timeout: 30000 }, async function(dataTable) {
    try {
        const criteria = dataTable.rowsHash();
        await this.leavePage.filterLeaveRequests({
            fromDate: criteria.fromDate,
            toDate: criteria.toDate,
            leaveType: criteria.leaveType,
            employeeName: criteria.employeeName,
            statuses: criteria.statuses ? criteria.statuses.split(',') : []
        });
    } catch (error) {
        console.error('Error filtering leave requests:', error);
        throw error;
    }
});

Then('I should see {int} leave records in the results', { timeout: 20000 }, async function(expectedCount) {
    try {
        const count = await this.leavePage.getLeaveRequestCount();
        expect(count).toBe(expectedCount);
    } catch (error) {
        console.error('Error checking leave records count:', error);
        throw error;
    }
});

