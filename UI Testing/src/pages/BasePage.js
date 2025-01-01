// src/pages/BasePage.js
const LOCATORS = require('../utils/locators');
const CONFIG = require('../utils/config');
const Helper = require('../utils/helper');

class BasePage {
    constructor(page, baseURL = CONFIG.BASE_URL) {
        this.page = page;
        this.baseURL = baseURL;
        this.locators = LOCATORS;
        this.helper = Helper;
    }

    async navigate(path) {
        await this.page.goto(this.baseURL + path);
        await this.helper.waitForPageLoad(this.page);
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout: CONFIG.TIMEOUTS.EXPLICIT_WAIT
        });
    }

    async clickElement(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    async typeText(selector, text) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    async selectDropdownOption(dropdownLocator, optionText) {
        await this.helper.selectDropdownOption(this.page, dropdownLocator, optionText);
    }

    async getElementText(selector) {
        await this.waitForElement(selector);
        return this.page.$eval(selector, el => el.textContent);
    }

    async isElementVisible(selector) {
        try {
            await this.waitForElement(selector);
            return true;
        } catch {
            return false;
        }
    }

    async waitForSuccess() {
        await this.helper.waitForToast(this.page);
    }
}

module.exports = BasePage;