// src/pages/timePage.js
const BasePage = require('./BasePage');

class TimePage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = this.locators.TIME_SHEET;
        this.employeeNameInput = this.locators.EMPLOYEE_NAME_INPUT;
        this.viewButton = this.locators.VIEW_BUTTON;
        this.submitButton = this.locators.SUBMIT_BUTTON;
    }

    async navigateToTimePage() {
        await this.navigate('/index.php/time/viewEmployeeTimesheet');
    }

    async searchEmployee(employeeName) {
        await this.typeText(this.employeeNameInput, employeeName);   
    }

    async getSearchResult() {
        await this.clickElement(this.viewButton);
        await this.page.waitForTimeout(5000);
        await this.clickElement(this.employeeNameInput);
        await this.page.waitForTimeout(5000);
    }
}

module.exports = TimePage;
