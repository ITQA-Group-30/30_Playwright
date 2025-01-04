const BasePage = require('./BasePage');
const locators = require('../utils/locators');

class BuzzPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.BUZZ;
        this.postInput = this.locators.POST_INPUT;
        this.postButton = this.locators.POST_BUTTON;
        this.successMessage = this.locators.SUCCESS_MESSAGE;
    }

    async navigateToBuzzPage() {
        await this.navigate('/index.php/buzz/viewBuzz');
    }

    async enterPostText(postText) {
        await this.typeText(this.postInput, postText);
    }

    async clickPostButton() {
        await this.clickElement(this.postButton);
    }

    async getSuccessMessage() {
        return await this.getElementText(this.successMessage);
    }
}

module.exports = BuzzPage;
