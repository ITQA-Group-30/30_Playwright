const BasePage = require('./BasePage');
const CONFIG = require('../utils/config');

class DeleteEmployeePage extends BasePage {
    constructor(page, baseURL) {
        super(page, baseURL);

        this.locators = {
            SEARCH_BUTTON: 'button[type="submit"]',
            DELETE_BUTTON: 'button:has-text("")',
            CONFIRM_DELETE_BUTTON: 'button:has-text(" Yes, Delete")',
            EMPLOYEE_LIST: '.oxd-table-body',
            NO_RECORDS_MESSAGE: '.orangehrm-horizontal-padding',
            SEARCH_FORM: '.oxd-form',
            SPINNER: '.oxd-loading-spinner',
            EMPLOYEE_ROW: '.oxd-table-card',
            EMPLOYEE_ID_CELL: '.oxd-table-cell'
        };

        this.timeouts = {
            search: 60000,
            delete: 30000,
            navigation: 30000
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

            // Additional wait to ensure the page is fully interactive
            await this.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error(`Failed to navigate to employee list: ${error.message}`);
        }
    }

    async searchEmployeeById(targetId) {
        try {
            // Wait for the search form to be visible and interactive
            await this.page.waitForSelector(this.locators.SEARCH_FORM, {
                state: 'visible',
                timeout: this.timeouts.search
            });

            // Use getByRole for more reliable input selection
            const idInput = this.page.getByRole('textbox').nth(2);

            // Wait for the input to be visible and interactable
            await idInput.waitFor({
                state: 'visible',
                timeout: this.timeouts.search
            });

            // Click the input first to ensure focus
            await idInput.click();

            // Small delay after click
            await this.page.waitForTimeout(500);

            // Type the ID instead of using fill() to ensure reliability
            await idInput.press('Control+a');
            await idInput.press('Backspace');
            await idInput.type(targetId, { delay: 100 });

            // Click search button
            const searchButton = this.page.getByRole('button', { name: 'Search' });
            await searchButton.click();

            // Wait for network idle and response
            await Promise.all([
                this.page.waitForLoadState('networkidle'),
                this.page.waitForResponse(
                    response => response.url().includes('/api/v2/pim/employees'),
                    { timeout: this.timeouts.search }
                )
            ]);

            // Wait for spinner to disappear if present
            const spinner = this.page.locator(this.locators.SPINNER);
            if (await spinner.isVisible()) {
                await spinner.waitFor({
                    state: 'hidden',
                    timeout: this.timeouts.search
                });
            }

            // Additional stability delay
            await this.page.waitForTimeout(2000);

            // Check for results
            const employeeList = this.page.locator(this.locators.EMPLOYEE_LIST);
            await employeeList.waitFor({ timeout: this.timeouts.search });

            return true;
        } catch (error) {
            throw new Error(`Failed to search for employee: ${error.message}`);
        }
    }

    async deleteEmployee() {
        try {
            // Wait for and click the delete button using role
            await this.page.waitForTimeout(1000); // Stability delay

            const deleteButton = this.page.getByRole('button', { name: '' }).first();
            await deleteButton.waitFor({
                state: 'visible',
                timeout: this.timeouts.delete
            });
            await deleteButton.click();

            // Confirm deletion
            const confirmButton = this.page.getByRole('button', { name: ' Yes, Delete' });
            await confirmButton.waitFor({
                state: 'visible',
                timeout: this.timeouts.delete
            });
            await confirmButton.click();

            // Wait for deletion to complete
            await this.page.waitForLoadState('networkidle');

            // Wait for success message
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