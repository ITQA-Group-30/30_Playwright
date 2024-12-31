const BasePage = require('./BasePage');

class AdminPage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.usernameInput = '[placeholder="Type for hints..."]';
        this.userRoleDropdown = '(//div[contains(@class, "oxd-select-wrapper")])[1]';
        this.searchButton = 'button[type="submit"]';
        this.userRecords = '.oxd-table-card';
    }

    async searchUser(username) {
        await this.waitForElement(this.usernameInput);
        await this.page.type(this.usernameInput, username);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(1000);
    }

    async getUserCount() {
        await this.waitForElement(this.userRecords);
        const elements = await this.page.$$(this.userRecords);
        return elements.length;
    }
}

module.exports = AdminPage;