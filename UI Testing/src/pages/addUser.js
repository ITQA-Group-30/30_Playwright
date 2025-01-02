// src/pages/addUser.js
const BasePage = require('./BasePage');

class AddUser extends BasePage {
    constructor(page) {
        super(page); // Call the parent class constructor
        this.locators = this.locators.ADDUSER;
        this.addUserButton = this.locators.ADD_USER_BUTTON; // Locator for the Add User button
        this.usernameInput = this.locators.USERNAME_INPUT; // Locator for the username input field
        this.passwordInput = this.locators.PASSWORD_INPUT; // Locator for the password input field
        this.confirmPasswordInput = this.locators.CONFIRM_PASSWORD_INPUT; // Locator for the confirm password input field
        this.saveButton = this.locators.SAVE_BUTTON; // Locator for the Save button
        this.successMessage = this.locators.SUCCESS_MESSAGE; // Locator for the success message
    }

    async navigateToAddUserPage() {
        await this.navigate('/index.php/admin/viewSystemUsers');
    }

    async clickAddUser() {
        await this.clickElement(this.addUserButton);
    }

    async fillUserDetails(username, password) {
        await this.typeText(this.usernameInput, username);
        await this.typeText(this.passwordInput, password);
        await this.typeText(this.confirmPasswordInput, password);
    }

    async saveUser() {
        await this.clickElement(this.saveButton);
        await this.waitForSuccess();
    }

    async getSuccessMessage() {
        return await this.getElementText(this.successMessage);
    }
}

module.exports = AddUser;
