const { Given, When, Then, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/getBooks/getBookById_User');
const CONFIG = require('../../../src/utils/config');

let bookAPI;
let response;
let bookId;

BeforeAll(async () => {
    bookAPI = new BookAPI();
    // Initialize with valid credentials for general setup
    await bookAPI.init(CONFIG.username, CONFIG.password);
});

AfterAll(async () => {
    // Cleanup if needed
    if (bookAPI && bookAPI.context) {
        await bookAPI.context.dispose();
    }
});

Given('no book exists in the database with the given id', async function() {
    bookId = -1;  // Using negative ID to trigger invalid input response
});

When('I send a GET request to {string} with an invalid id', async function(endpoint) {
    response = await bookAPI.getBookById(bookId);
});

Then('the response status for invalid book ID should be {int}', async function(expectedStatus) {
    expect(response.status).toBe(expectedStatus);
});

Then('the response should indicate that the book was not found', async function() {
    expect(response.body.message).toBe("Invalid | Empty Input Parameters in the Request");
});

Given('the user is not authorized', async function() {
    // Reinitialize BookAPI with invalid credentials
    bookAPI = new BookAPI();
    await bookAPI.init('invalid_user', 'invalid_password');
});

When('I send a GET request to {string} with an invalid authorization token', async function(endpoint) {
    bookId = 1;  // Use a valid ID format to isolate authentication testing
    response = await bookAPI.getBookById(bookId);
});

Then('the response status for unauthorized access should be {int}', async function(expectedStatus) {
    expect(response.status).toBe(expectedStatus);
});

