const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DeleteEmployeePage = require('../../src/pages/DeleteEmployeePage');

let deletePage;

Given('I am on the PIM page a', { timeout: 60000 }, async function() {
    try {
        deletePage = new DeleteEmployeePage(this.page, this.baseURL);
        await deletePage.navigateToEmployeeList();
    } catch (error) {
        console.error('Navigation error:', error);
        throw new Error(`Failed to navigate to PIM page: ${error.message}`);
    }
});

When('I search for employee with id {string}', { timeout: 60000 }, async function(id) {
    try {
        // Add a small delay before search
        await this.page.waitForTimeout(1000);
        await deletePage.searchEmployeeById(id);
    } catch (error) {
        console.error('Search error:', error);
        throw new Error(`Failed to search for employee: ${error.message}`);
    }
});

When('I delete the employee', { timeout: 60000 }, async function() {
    try {
        const success = await deletePage.deleteEmployee();
        expect(success).toBe(true);
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error(`Failed to delete employee: ${error.message}`);
    }
});

Then('the employee should be successfully deleted', { timeout: 60000 }, async function() {
    try {
        const isDeleted = await deletePage.verifyEmployeeDeleted();
        expect(isDeleted).toBe(true);
    } catch (error) {
        console.error('Verification error:', error);
        throw new Error(`Failed to verify employee deletion: ${error.message}`);
    }
});