const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/getBooks/getBookById_User');

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

// Step: User is logged in
Given('I am logged in as a user', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init('username', 'password'); // Provide valid credentials
});

// Step: Send GET request to endpoint
When('I send a GET request to {string}', async function (endpoint) {
    response = await bookAPI.getBookById(endpoint);
});

// Step: Verify response status
Then('I should receive a {int} response', async function (expectedStatus) {
    expect(response.status).toBe(expectedStatus);
});

// Step: Verify book details in response
Then('the response should contain book details', async function () {
    const book = response.body;
    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
});

// Step: Response should contain error message
Then('the response should say {string}', async function (expectedMessage) {
    const body = response.body;
    expect(body.message).toBe(expectedMessage);
});

// Step: User is not logged in
Given('Im not logged in', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init();
});
