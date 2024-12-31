class BasePage {
    constructor(page, baseURL) {
        this.page = page;
        this.baseURL = baseURL;
    }

    async navigate(path) {
        await this.page.goto(this.baseURL + path);
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector);
    }
}

module.exports = BasePage;