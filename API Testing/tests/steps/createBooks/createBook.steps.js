const { Given, When, Then, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/createBooks/BookAPI_For_Post');
const CONFIG = require('../../../src/utils/config');

let bookAPI;
let response;

BeforeAll(async () => {
    bookAPI = new BookAPI();
    await bookAPI.init(CONFIG.username, CONFIG.password);
});

AfterAll(async () => {
    if (bookAPI && bookAPI.context) {
        await bookAPI.context.dispose();
    }
});

Given('I am logged in with valid credentials', async function () {
    // Reinitialize with valid credentials
    bookAPI = new BookAPI();
    await bookAPI.init(CONFIG.username, CONFIG.password);
});

When('I create a book with the following details:', async function (dataTable) {
    const bookDetails = dataTable.hashes()[0];
    response = await bookAPI.createBook(bookDetails);
});

Then('the response status code {int}', async function (expectedStatusCode) {
    expect(response.status).toBe(expectedStatusCode);
});

Then('the response message {string}', async function (expectedMessage) {
    expect(response.body.message).toBe(expectedMessage);
});
