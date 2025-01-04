
const BasePage = require('./BasePage');

class ClaimPage extends BasePage {
    constructor(page) {
        super(page); 
        this.locators = this.locators.CLAIM;
        this.eventNameDropDown = this.locators.EVENT_NAME_DROPDOWN;
        this.statusDropDown = this.locators.STATUS_DROPDOWN;
        this.employeeNameInput = this.locators.EMPLOYEE_NAME;
        this.referenceIdInput = this.locators.REFERENCE_ID;
        this.searchButton = this.locators.SEARCH_BUTTON;
    }

    async navigateToClaimPage() {
        await this.navigate('/index.php/claim/viewAssignClaim');
    }

    async fillClaimDetails(eventName, status, employeeName, referenceId) {
        await this.selectDropdownOption(this.eventNameDropDown, eventName);
        await this.selectDropdownOption(this.statusDropDown, status);
        await this.typeText(this.employeeNameInput, employeeName);
        await this.typeText(this.referenceIdInput, referenceId);
    }

    async searchClaim() {
        await this.clickElement(this.saveButton);
    }
}

module.exports = ClaimPage;
