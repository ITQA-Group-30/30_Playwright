const LOCATORS = {
    // Admin Page Locators
    ADMIN: {
        USERNAME_INPUT: '[placeholder="Type for hints..."]',
        USER_ROLE_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[1]',
        STATUS_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[2]',
        SEARCH_BUTTON: 'button[type="submit"]',
        RESET_BUTTON: 'button[type="reset"]',
        USER_RECORDS: '.oxd-table-card',
        ADD_BUTTON: '.oxd-button--secondary',
        DELETE_BUTTON: '.oxd-icon-button.oxd-table-cell-action-space',
        EMPLOYEE_NAME_INPUT: '.oxd-autocomplete-text-input input',
        USER_DROPDOWN_OPTIONS: '.oxd-select-dropdown div'
    },

    // PIM Page Locators
    PIM: {
        EMPLOYEE_NAME_INPUT: '[placeholder="Type for hints..."]',
        EMPLOYEE_ID_INPUT: '//label[contains(text(), "Employee Id")]/../..//input',
        SEARCH_BUTTON: 'button[type="submit"]',
        RESET_BUTTON: 'button[type="reset"]',
        EMPLOYEE_LIST: '.oxd-table-card',
        ADD_BUTTON: '.oxd-button--secondary',
        DELETE_BUTTON: '.oxd-icon-button.oxd-table-cell-action-space',
        EMPLOYMENT_STATUS_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[1]',
        INCLUDE_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[2]',
        SUPERVISOR_NAME_INPUT: '.oxd-autocomplete-text-input input'
    },

    // Leave Page Locators
    LEAVE: {
        FROM_DATE_INPUT: '//label[contains(text(), "From Date")]/../..//input',
        TO_DATE_INPUT: '//label[contains(text(), "To Date")]/../..//input',
        SHOW_LEAVE_STATUS: '.oxd-multiselect-wrapper',
        LEAVE_TYPE_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[1]',
        SEARCH_BUTTON: 'button[type="submit"]',
        RESET_BUTTON: 'button[type="reset"]',
        LEAVE_RECORDS: '.oxd-table-card',
        EMPLOYEE_NAME_INPUT: '.oxd-autocomplete-text-input input',
        STATUS_CHECKBOXES: '.oxd-checkbox-wrapper input',
        LEAVE_LIST_ITEMS: '.oxd-table-card'
    },

    // My Info Page Locators
    MY_INFO: {
        PERSONAL_DETAILS_TAB: '.orangehrm-tabs',
        FIRST_NAME_INPUT: '[name="firstName"]',
        LAST_NAME_INPUT: '[name="lastName"]',
        MIDDLE_NAME_INPUT: '[name="middleName"]',
        EMPLOYEE_ID_INPUT: '//label[contains(text(), "Employee Id")]/../..//input',
        NATIONALITY_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[1]',
        MARITAL_STATUS_DROPDOWN: '(//div[contains(@class, "oxd-select-wrapper")])[2]',
        DATE_OF_BIRTH_INPUT: '//label[contains(text(), "Date of Birth")]/../..//input',
        GENDER_RADIO_MALE: '//label[contains(text(), "Male")]/../input',
        GENDER_RADIO_FEMALE: '//label[contains(text(), "Female")]/../input',
        SAVE_BUTTON: 'button[type="submit"]'
    },

    // Common Locators
    COMMON: {
        LOADING_SPINNER: '.oxd-loading-spinner',
        ERROR_MESSAGE: '.oxd-text.oxd-text--span.oxd-input-field-error-message',
        SUCCESS_MESSAGE: '.oxd-toast-content--success',
        DROPDOWN_OPTIONS: '.oxd-select-dropdown div',
        TABLE_HEADER: '.oxd-table-header',
        TABLE_ROWS: '.oxd-table-card',
        CHECKBOXES: '.oxd-checkbox-wrapper input'
    },
    ADDUSER: {
        ADD_USER_BUTTON: 'button#btnAdd', // Locator for Add User button
        USERNAME_INPUT: 'input#systemUser_userName', // Locator for username input
        PASSWORD_INPUT: 'input#systemUser_password', // Locator for password input
        CONFIRM_PASSWORD_INPUT: 'input#systemUser_confirmPassword', // Locator for confirm password input
        SAVE_BUTTON: 'input#btnSave', // Locator for save button
        SUCCESS_MESSAGE: 'div.success', // Locator for success message
    }
};

module.exports = LOCATORS;