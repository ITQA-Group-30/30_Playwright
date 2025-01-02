const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AddUser = require('../../src/pages/addUser');  // Import AddUser page object
const config = require('../../src/utils/config');  // Import the configuration

let addUserPage;

Given('I am on the Admin page', async function() {
    await this.page.goto(config.BASE_URL);
    // You can skip the login step as requested
    await this.page.goto(`${config.BASE_URL}admin/viewSystemUsers`);
    addUserPage = new AddUser(this.page);
});

When('I click on the "Add User" button', async function () {
    console.log('Waiting for the "Add User" button...');

    // Ensure the button is visible and clickable
    await this.page.getByRole('button', { name: ' Add' }).waitFor({ state: 'visible', timeout: 30000 });

    console.log('Button found, clicking...');
    await this.page.getByRole('button', { name: ' Add' }).click();
});


When('I fill in the user details',{ timeout: 150000 }, async function() {
    // Fill the 'Role' dropdown
    await this.page.getByText('-- Select --').first().click();
    await this.page.getByRole('option', { name: 'Admin' }).click();

    // Fill the 'Type for hints...' field
    await this.page.getByPlaceholder('Type for hints...').click();
    await this.page.getByPlaceholder('Type for hints...').fill('A8DCo 4Ys 010Z');

    // Select 'Enabled' from the dropdown
    await this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    // Fill textboxes for username and password
    await this.page.getByRole('textbox').nth(2).click();
    await this.page.getByRole('textbox').nth(2).fill('newUser');  // Replace with dynamic or test data if needed

    await this.page.getByRole('textbox').nth(3).click();
    await this.page.getByRole('textbox').nth(3).fill('password123'); // Replace with dynamic or test data if needed

    // Confirm the password
    await this.page.getByRole('textbox').nth(4).click();
    await this.page.getByRole('textbox').nth(4).fill('password123'); // Replace with dynamic or test data if needed

    // Wait for 'Save' button to be visible and click it
    await this.page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('button', { name: 'Save' }).click();
});


When('I click "Save"', async function() {
    try {
        console.log('Waiting for Save button...');
        await this.page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible', timeout: 30000 });

        console.log('Save button visible, clicking now...');
        await this.page.getByRole('button', { name: 'Save' }).click();
    } catch (error) {
        console.error('Error clicking Save button:', error);
        throw error;
    }
});


Then('the new user should be added successfully', { timeout: 10000 }, async function() {
    const successMessage = await this.page.locator('text=User added successfully');
    await successMessage.waitFor({ state: 'visible', timeout: 10000 });
    if (!await successMessage.isVisible()) {
        throw new Error('User was not added successfully');
    }
});

