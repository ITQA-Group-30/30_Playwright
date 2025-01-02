const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/createBooks/BookAPI_For_Post');

// Increase timeout to 30 seconds
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
        if (values[index] !== '') {
            bookDetails[header] = values[index];
        }
    });

    try {
        response = await bookAPI.createBook(bookDetails);
    } catch (error) {
        if (error.response) {
            response = error.response; // Capture error response
        } else {
            console.error(`Unexpected error: ${error.message}`);
            throw error;
        }
    }
});

Then('the response status code {int}', async function (statusCode) {
    if (!response) {
        throw new Error('No response received from API');
    }
    expect(response.status).toBe(statusCode); // Access status as a property
});


Then('the response message {string}', async function (message) {
    if (!response) {
        throw new Error('No response received from API');
    }
    const responseBody = await response.json();  // Await if necessary
    expect(responseBody.message).toBe(message);
});

When('I create a new book with the existing bookname and author', async function () {
    try {
        response = await bookAPI.createBook({ title: "Existing Book", author: "Existing Author" });
    } catch (error) {
        if (error.response) {
            response = error.response; // Capture error response
        } else {
            console.error(`Unexpected error: ${error.message}`);
            throw error;
        }
    }
});
