const BasePage = require('./BasePage');

class DirectoryPage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.searchInput = '[placeholder="Type for hints..."]';
        this.searchButton = 'button[type="submit"]';
        this.employeeCards = '.oxd-grid-item';
    }

    async searchEmployee(name) {
        await this.waitForElement(this.searchInput);
        await this.page.type(this.searchInput, name);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(1000);
    }

    async getEmployeeCount() {
        await this.waitForElement(this.employeeCards);
        const elements = await this.page.$$(this.employeeCards);
        return elements.length;
    }
}

module.exports = DirectoryPage;