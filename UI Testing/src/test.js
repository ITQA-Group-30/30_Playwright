const { chromium } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = '[name="username"]';
        this.password = '[name="password"]';
        this.loginButton = '[type="submit"]';
        this.errorMessage = '.oxd-alert';
    }

    async navigateToURL() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php');
    }

    async login(username, password) {
        await this.page.fill(this.username, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        const errorElement = await this.page.$(this.errorMessage);
        return errorElement ? await errorElement.textContent() : '';
    }

    async isDashboardVisible() {
        return await this.page.waitForSelector('.oxd-topbar-header-breadcrumb', { state: 'visible' });
    }
}

class EmployeePage {
    constructor(page) {
        this.page = page;
        this.pimMenu = '//span[text()="PIM"]';
        this.addButton = 'button.oxd-button--secondary';
        this.firstName = '[name="firstName"]';
        this.middleName = '[name="middleName"]';
        this.lastName = '[name="lastName"]';
        this.employeeId = '//div[@class="oxd-grid-item oxd-grid-item--gutters"]//input[@class="oxd-input oxd-input--active"]';
        this.saveButton = '[type="submit"]';
        this.successMessage = '.oxd-toast';
        this.employeeList = '.oxd-table-card';
        this.searchName = '.oxd-input.oxd-input--active';
        this.searchButton = '[type="submit"]';
    }

    async navigateToPIM() {
        await this.page.click(this.pimMenu);
        await this.page.waitForLoadState('networkidle');
    }

    async addEmployee(firstName, middleName, lastName, employeeId) {
        await this.page.click(this.addButton);
        await this.page.fill(this.firstName, firstName);
        await this.page.fill(this.middleName, middleName);
        await this.page.fill(this.lastName, lastName);
        const empIdField = await this.page.$('xpath=' + this.employeeId);
        await empIdField.clear();
        await empIdField.fill(employeeId);
        await this.page.click(this.saveButton);
    }

    async searchEmployee(name) {
        await this.page.fill(this.searchName, name);
        await this.page.click(this.searchButton);
        await this.page.waitForLoadState('networkidle');
    }

    async getSuccessMessage() {
        await this.page.waitForSelector(this.successMessage);
        return await this.page.textContent(this.successMessage);
    }

    async isEmployeeListVisible() {
        return await this.page.isVisible(this.employeeList);
    }
}

module.exports = { LoginPage, EmployeePage };