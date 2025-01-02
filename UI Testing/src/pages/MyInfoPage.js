const BasePage = require('./BasePage');

class MyInfoPage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.personalDetailsTab = '.orangehrm-tabs';
        this.firstNameInput = '[name="firstName"]';
        this.lastNameInput = '[name="lastName"]';
        this.saveButton = 'button[type="submit"]';
    }

    async isPersonalDetailsVisible() {
        await this.waitForElement(this.personalDetailsTab);
        return this.page.isVisible(this.personalDetailsTab);
    }
}

module.exports = MyInfoPage;