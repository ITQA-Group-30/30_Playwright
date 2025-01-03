
const BasePage = require('./BasePage');

class PerformancePage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = this.locators.PERFORMANCE;
        this.employeeNameInput = this.locators.EMPLOYEE_NAME;
        this.fromDateInput = this.locators.FROM_DATE;
        this.fromDateInput = this.locators.TO_DATE;
    }

    async navigateToPerformancePage() {
        await this.navigate('/index.php/performance/searchEvaluatePerformanceReview');
    }

    async calenderDateSelection(employeeName, fromDate, toDate) {
        await this.typeText(this.employeeNameInput, employeeName);
    }
}

module.exports = PerformancePage;
