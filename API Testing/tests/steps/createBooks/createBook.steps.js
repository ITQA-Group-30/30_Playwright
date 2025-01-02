const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/createBooks/BookAPI_For_Post');

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

Given('I am logged in with valid credentials', async function () {
    try {
        bookAPI = new BookAPI();
        await bookAPI.init();
    } catch (error) {
        console.error(`Error during login: ${error.message}`);
        throw error;
    }
});

When('I create a book with the following details:', async function (dataTable) {
    const rows = dataTable.rawTable;
    const headers = rows[0];
    const values = rows[1];

    const bookDetails = {};
    headers.forEach((header, index) => {
        bookDetails[header] = values[index];
    });

    try {
        response = await bookAPI.createBook(bookDetails);
    } catch (error) {
        console.error(`Error during book creation: ${error.message}`);
        throw error;
    }
});

Then('the response status code should be {int}', async function (statusCode) {
    expect(response.status).toBe(statusCode);
});

Then('the response message should be {string}', async function (message) {
    const responseBody = response.body;
    expect(responseBody.message).toBe(message);
});
