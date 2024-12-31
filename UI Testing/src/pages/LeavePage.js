const BasePage = require('./BasePage');

class LeavePage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.fromDateInput = '.oxd-date-input input';
        this.toDateInput = '.oxd-date-input input';
        this.searchButton = 'button[type="submit"]';
        this.leaveRecords = '.oxd-table-card';
    }

    async searchLeaveRequests() {
        await this.waitForElement(this.searchButton);
        await this.page.click(this.searchButton);
        await this.page.waitForTimeout(1000);
    }

    async getLeaveRequestCount() {
        await this.waitForElement(this.leaveRecords);
        const elements = await this.page.$$(this.leaveRecords);
        return elements.length;
    }
}

module.exports = LeavePage;