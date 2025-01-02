const BasePage = require('./BasePage');
const CONFIG = require('../utils/config');

class AdminPage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.locators = this.locators.ADMIN;
    }

    async searchUser(username) {
        await this.typeText(this.locators.USERNAME_INPUT, username);
        await this.clickElement(this.locators.SEARCH_BUTTON);
        await this.page.waitForTimeout(1000);
    }

    async getUserCount() {
        await this.waitForElement(this.locators.USER_RECORDS);
        const elements = await this.page.$$(this.locators.USER_RECORDS);
        return elements.length;
    }

    async setUserRole(role) {
        await this.selectDropdownOption(this.locators.USER_ROLE_DROPDOWN, role);
    }
}

module.exports = AdminPage;