const BasePage = require('./BasePage');
const CONFIG = require('../utils/config');

class PIMPage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.locators = this.locators.PIM;
    }

    async searchEmployee(name) {
        await this.typeText(this.locators.EMPLOYEE_NAME_INPUT, name);
        await this.clickElement(this.locators.SEARCH_BUTTON);
        await this.page.waitForTimeout(1000);
    }

    async getEmployeeCount() {
        await this.waitForElement(this.locators.EMPLOYEE_LIST);
        const elements = await this.page.$$(this.locators.EMPLOYEE_LIST);
        return elements.length;
    }
}

module.exports = PIMPage;