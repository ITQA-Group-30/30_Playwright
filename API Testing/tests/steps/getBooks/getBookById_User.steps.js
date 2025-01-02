const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BooksAPI } = require('../../../src/pages/getBooks/getBookById_User');

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;

Given('no book exists in the database with the given id', async function () {
    bookId = 'invalid-id'; // Set an invalid book ID for testing
});

When('I send a GET request to {string} with an invalid id', async function (endpoint) {
    response = await bookAPI.getBookById(bookId); // Fetch book with an invalid ID
});

Then('the response status for invalid book ID should be {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus); // Validate the status code
});

Then('the response should indicate that the book was not found', async function () {
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Not Found'); // Validate the error message
});

Given('the user is not authorized', async function () {
    bookAPI = new BookAPI(); // Initialize BookAPI
    await bookAPI.init(); // Initialize context
});

When('I send a GET request to {string} with an invalid authorization token', async function (endpoint) {
    response = await bookAPI.getBookById(bookId, 'invalid-token'); // Use an invalid token
});

Then('the response status for unauthorized access should be {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus); // Validate the status code
});
