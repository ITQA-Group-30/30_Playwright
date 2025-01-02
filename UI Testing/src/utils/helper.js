const {COMMON} = require("./locators");

class Helper {
    static async waitForPageLoad(page) {
        await page.waitForLoadState('networkidle');
        await page.waitForSelector(COMMON.TABLE_HEADER, { state: 'visible' });
    }

    static async selectDropdownOption(page, dropdownLocator, optionText) {
        await page.click(dropdownLocator);
        await page.waitForSelector(COMMON.DROPDOWN_OPTIONS);
        await page.click(`text="${optionText}"`);
    }

    static async waitForToast(page) {
        await page.waitForSelector(COMMON.SUCCESS_MESSAGE, { state: 'visible' });
    }

    static getRandomString(length = 8) {
        return Math.random().toString(36).substring(2, length + 2);
    }

    static getRandomNumber(min = 1000, max = 9999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static formatDate(date) {
        return date.toISOString().split('T')[0];
    }
}

module.exports = Helper;