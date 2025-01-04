const BasePage = require('./BasePage');
const LOCATORS = require('../utils/locators');

class LeavePage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);
        this.locators = LOCATORS.LEAVE;
    }

    async filterLeaveRequests({
                                  fromDate = null,
                                  toDate = null,
                                  leaveType = null,
                                  employeeName = null,
                                  statuses = []
                              } = {}) {
        try {
            // Handle From Date
            if (fromDate) {
                const fromDateInput = this.page.locator(this.locators.FROM_DATE_INPUT);
                await fromDateInput.fill('');  // Clear existing date
                await fromDateInput.fill(fromDate);
                await this.page.keyboard.press('Enter');
            }

            // Handle To Date
            if (toDate) {
                const toDateInput = this.page.locator(this.locators.TO_DATE_INPUT);
                await toDateInput.fill('');  // Clear existing date
                await toDateInput.fill(toDate);
                await this.page.keyboard.press('Enter');
            }

            // Handle Leave Type selection
            if (leaveType) {
                await this.page.locator(this.locators.LEAVE_TYPE_DROPDOWN).click();
                await this.page.waitForSelector(LOCATORS.COMMON.DROPDOWN_OPTIONS);
                await this.page.getByText(leaveType).click();
            }

            // Handle Employee Name
            if (employeeName) {
                const employeeInput = this.page.locator(this.locators.EMPLOYEE_NAME_INPUT);
                await employeeInput.fill(employeeName);
                await this.page.waitForTimeout(1000); // Wait for suggestions
                await this.page.locator('.oxd-autocomplete-option').first().click();
            }

            // Handle Leave Status checkboxes
            if (statuses.length > 0) {
                await this.page.locator(this.locators.SHOW_LEAVE_STATUS).click();
                for (const status of statuses) {
                    await this.page.getByText(status, { exact: true }).click();
                }
                // Click outside to close dropdown
                await this.page.locator('body').click();
            }

            // Click Search
            await this.page.locator(this.locators.SEARCH_BUTTON).click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Error filtering leave requests:', error);
            throw new Error(`Failed to filter leave requests: ${error.message}`);
        }
    }

    async getLeaveRequestCount() {
        try {
            await this.page.waitForSelector(this.locators.LEAVE_RECORDS, {
                state: 'visible',
                timeout: 10000
            });
            const records = await this.page.$$(this.locators.LEAVE_RECORDS);
            return records.length;
        } catch (error) {
            console.error('Error getting leave request count:', error);
            return 0;
        }
    }

    async getLeaveDetails() {
        try {
            await this.page.waitForSelector(this.locators.LEAVE_LIST_ITEMS);
            const leaveItems = await this.page.$$(this.locators.LEAVE_LIST_ITEMS);

            const leaveDetails = await Promise.all(
                leaveItems.map(async (item) => {
                    const cells = await item.$$('div[role="cell"]');
                    return {
                        employeeName: await cells[1].innerText(),
                        leaveType: await cells[2].innerText(),
                        fromDate: await cells[3].innerText(),
                        toDate: await cells[4].innerText(),
                        status: await cells[5].innerText(),
                    };
                })
            );

            return leaveDetails;
        } catch (error) {
            console.error('Error getting leave details:', error);
            throw error;
        }
    }

    async resetFilters() {
        await this.page.locator(this.locators.RESET_BUTTON).click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = LeavePage;