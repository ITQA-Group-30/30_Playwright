const BasePage = require('./BasePage');
const CONFIG = require('../utils/config');

class DeleteEmployeePage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);

        this.locators = {
            EMPLOYEE_ID_INPUT: '[placeholder="0000"]',  // More specific selector for ID input
            SEARCH_BUTTON: 'button[type="submit"]',
            DELETE_BUTTON: 'button i.bi-trash',  // More specific selector for delete button
            CONFIRM_DELETE_BUTTON: 'button.oxd-button--label-danger',
            EMPLOYEE_LIST: '.oxd-table-body',
            NO_RECORDS_MESSAGE: '.orangehrm-horizontal-padding',
            SEARCH_FORM: '.oxd-form',
            SPINNER: '.oxd-loading-spinner',
        };

        this.timeouts = {
            search: 60000,  // Increased timeout for search operations
            delete: 30000,
            navigation: 30000,
        };
    }

    async navigateToEmployeeList() {
        try {
            await this.navigate(CONFIG.ROUTES.PIM);

            // Wait for the page to be fully loaded
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForSelector(this.locators.SEARCH_FORM, {
                state: 'visible',
                timeout: this.timeouts.navigation
            });

            // Wait for any loading spinner to disappear
            const spinner = this.page.locator(this.locators.SPINNER);
            if (await spinner.isVisible())
                await spinner.waitFor({ state: 'hidden', timeout: this.timeouts.navigation });

        } catch (error) {
            throw new Error(`Failed to navigate to employee list: ${error.message}`);
        }
    }

    async searchEmployeeById(id) {
        try {
            // Wait for the search form and ensure it's interactive
            await this.page.waitForSelector(this.locators.SEARCH_FORM, {
                state: 'visible',
                timeout: this.timeouts.search
            });

            // Find and fill the employee ID input
            const idInput = this.page.locator(this.locators.EMPLOYEE_ID_INPUT);
            await idInput.waitFor({ state: 'visible', timeout: this.timeouts.search });

            // Clear existing value and fill new ID with retry logic
            await this.page.waitForTimeout(1000); // Small delay for stability
            await idInput.clear();
            await idInput.fill(id);

            // Verify the input value
            const inputValue = await idInput.inputValue();
            if (inputValue !== id) {
                await idInput.fill(id); // Retry if value wasn't set correctly
            }

            // Click search and wait for results
            await this.page.locator(this.locators.SEARCH_BUTTON).click();

            // Wait for search results
            await Promise.all([
                this.page.waitForLoadState('networkidle'),
                this.page.waitForResponse(
                    response => response.url().includes('/api/v2/pim/employees') &&
                        response.status() === 200,
                    { timeout: this.timeouts.search }
                )
            ]);

            // Wait for any loading spinner to disappear
            const spinner = this.page.locator(this.locators.SPINNER);
            if (await spinner.isVisible())
                await spinner.waitFor({ state: 'hidden', timeout: this.timeouts.search });

            // Additional wait for UI stability
            await this.page.waitForTimeout(2000);

            // Verify results are displayed
            const employeeList = this.page.locator(this.locators.EMPLOYEE_LIST);
            await employeeList.waitFor({ timeout: this.timeouts.search });

        } catch (error) {
            throw new Error(`Failed to search for employee: ${error.message}`);
        }
    }

    async deleteEmployee() {
        try {
            // Wait for and click the delete button
            const deleteButton = this.page.locator(this.locators.DELETE_BUTTON).first();
            await deleteButton.waitFor({ state: 'visible', timeout: this.timeouts.delete });
            await deleteButton.click();

            // Wait for and click the confirm delete button
            const confirmButton = this.page.locator(this.locators.CONFIRM_DELETE_BUTTON);
            await confirmButton.waitFor({ state: 'visible', timeout: this.timeouts.delete });
            await confirmButton.click();

            // Wait for the deletion to complete
            await this.page.waitForLoadState('networkidle');

            // Wait for success message or no records message
            await this.page.waitForSelector(this.locators.NO_RECORDS_MESSAGE, {
                state: 'visible',
                timeout: this.timeouts.delete
            });

            return true;
        } catch (error) {
            throw new Error(`Failed to delete employee: ${error.message}`);
        }
    }

    async verifyEmployeeDeleted() {
        try {
            // Wait for the no records message to be visible
            const noRecordsMessage = this.page.locator(this.locators.NO_RECORDS_MESSAGE);
            await noRecordsMessage.waitFor({
                state: 'visible',
                timeout: this.timeouts.delete
            });

            return await noRecordsMessage.isVisible();
        } catch (error) {
            throw new Error(`Failed to verify employee deletion: ${error.message}`);
        }
    }
}

module.exports = DeleteEmployeePage;