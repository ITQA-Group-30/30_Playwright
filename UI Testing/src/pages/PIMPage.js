const BasePage = require('./BasePage');

class PIMPage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.employeeNameInput = '[placeholder="Type for hints..."]';
        this.searchButton = 'button[type="submit"]';
        this.employeeList = '.oxd-table-card';
        this.addButton = '.oxd-button--secondary';
    }

    async searchEmployee(name) {
        await this.waitForElement(this.employeeNameInput);
        await this.page.type(this.employeeNameInput, name);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(1000);
    }

    async getEmployeeCount() {
        await this.waitForElement(this.employeeList);
        const elements = await this.page.$$(this.employeeList);
        return elements.length;
    }
}

module.exports = PIMPage;