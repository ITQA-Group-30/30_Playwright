const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BooksAPI } = require('../../../src/test'); // Ensure path is correct

// Increase timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;  // Store book ID for later use


Given('no book exists in the database with the given id', async function () {
    // Ensure the book ID does not exist in the database
    bookId = 'invalid-id';  // Set an invalid book ID for testing
});

When('I send a GET request to {int} with an invalid id', async function () {
    response = await bookAPI.getBookById(bookId, 'admin:password');  // Fetch book with an invalid ID
});

Then('the response status code should a {int} for not found', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);  // Expect a 404 status
});

Then('the response should indicate that the book was not found', async function () {
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Not Found');  // Assuming the error message is 'Not Found'
});

Given('the user is not authorized', async function () {
    bookAPI = new BooksAPI();  // Initialize BooksAPI
    await bookAPI.init();  // Initialize context
});

When('I send a GET request to {int} with an invalid authorization token', async function () {
    // Send request with an invalid token (or no token)
    response = await bookAPI.getBookById(bookId, 'invalid-token');  // Use an invalid token
});

Then('the response status code should  {int} for unauthorized', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);  // Expect a 401 status
});
