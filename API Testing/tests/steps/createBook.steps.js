const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../src/pages/BookAPI_For_Post');

// Increase timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

Given('I am logged in as {string} with password {string}', async function (username, password) {
    try {
        bookAPI = new BookAPI();
        await bookAPI.init(username, password);
    } catch (error) {
        console.error(`Error during login: ${error.message}`);
        throw error;
    }
});

When('I create a book with the following details:', async function (dataTable) {

    const rows = dataTable.rawTable;  // Get the raw table as a 2D array
    const headers = rows[0];  // The first row contains the column names
    const values = rows[1];   // The second row contains the values

    const bookDetails = {};  // Initialize an empty object to store key-value pairs

    // Loop through the headers and assign values
    headers.forEach((header, index) => {
        bookDetails[header] = values[index];  // Map headers to their corresponding values
    });

    try {
        // Pass the constructed book details to the API method
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
    const responseBody = await response.json();
    expect(responseBody.message).toBe(message);
});

// Additional Scenarios

When('I create a book without bookname', async function () {
    try {
        response = await bookAPI.createBook({ title: "Author Name" }); // Changed to title instead of author
    } catch (error) {
        console.error(`Error during book creation: ${error.message}`);
        throw error;
    }
});

When('I create a book without author', async function () {
    try {
        response = await bookAPI.createBook({ title: "Book Title" });
    } catch (error) {
        console.error(`Error during book creation: ${error.message}`);
        throw error;
    }
});

When('I create a new book with the existing bookname and author', async function () {
    try {
        response = await bookAPI.createBook({ title: "Existing Book", author: "Existing Author" });
    } catch (error) {
        console.error(`Error during book creation: ${error.message}`);
        throw error;
    }
});
