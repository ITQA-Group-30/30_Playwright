const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AddUser = require('../../src/pages/addUser');
const config = require('../../src/utils/config');

let addUserPage;

Given('I am on the Admin page', async function () {
    await this.page.goto(config.BASE_URL);
    await this.page.goto(`${config.BASE_URL}admin/viewSystemUsers`);
    addUserPage = new AddUser(this.page);
});

When('I click on the "Add User" button', async function () {
    console.log('Waiting for the "Add User" button...');
    const addButton = this.page.getByRole('button', { name: ' Add' });
    await addButton.waitFor({ state: 'visible', timeout: 30000 });
    console.log('Button found, clicking...');
    await addButton.click();
});

When('I fill in the user details', { timeout: 150000 }, async function () {
    console.log('Filling in user details...');

    // Select Role
    await this.page.getByText('-- Select --').first().click();
    await this.page.getByRole('option', { name: 'Admin' }).click();

    // Enhanced Employee Name handling
    const employeeNameInput = this.page.getByPlaceholder('Type for hints...');
    await employeeNameInput.click();
    await employeeNameInput.fill('Saket Kumar Arya');

    // Wait for dropdown to appear and be visible
    console.log('Waiting for employee dropdown...');
    const dropdownList = this.page.locator('.oxd-autocomplete-dropdown');
    await dropdownList.waitFor({ state: 'visible', timeout: 10000 });

    // Wait for dropdown items to load
    await this.page.waitForTimeout(2000); // Give time for API response

    // Select the first matching option from dropdown
    const dropdownOption = this.page.locator('.oxd-autocomplete-option').first();
    if (await dropdownOption.isVisible()) {
        await dropdownOption.click();
        console.log('Selected employee from dropdown');
    } else {
        throw new Error('No matching employee found in dropdown');
    }

    // Verify selection was made
    await this.page.waitForTimeout(1000); // Wait for input to update
    const inputValue = await employeeNameInput.inputValue();
    if (!inputValue) {
        throw new Error('Employee name was not properly selected');
    }

    // Select Status
    await this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    // Fill in Username and Password
    const fields = this.page.getByRole('textbox');
    await fields.nth(2).click();
    await fields.nth(2).fill('newUser');
    await fields.nth(3).click();
    await fields.nth(3).fill('password123');
    await fields.nth(4).click();
    await fields.nth(4).fill('password123');
});

When('I click "Save"', { timeout: 100000 }, async function () {
    try {
        console.log('Waiting for Save button...');
        const saveButton = this.page.getByRole('button', { name: 'Save' });
        await saveButton.waitFor({ state: 'visible', timeout: 30000 });
        console.log('Clicking Save...');
        await saveButton.click();
    } catch (error) {
        console.error('Error clicking Save button:', error.message);
        throw error;
    }
});
