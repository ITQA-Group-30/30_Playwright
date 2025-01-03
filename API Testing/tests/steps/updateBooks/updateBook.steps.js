const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const UpdateBookAPI = require('../../../src/pages/updateBooks/UpdateBookAPI');

setDefaultTimeout(30 * 1000);

let updateBookAPI;
let response;

Given('I am logged in as aa {string} with password {string}', async function(username, password) {
    updateBookAPI = new UpdateBookAPI();
    await updateBookAPI.init(username, password);
});


When('I try to update a book with valid details', async function(dataTable) {
    const data = dataTable.hashes()[0];
    response = await updateBookAPI.updateBook(Number(data.id), data.title, data.author);
});

When('I try to update a book with invalid ID type', async function(dataTable) {
    const data = dataTable.hashes()[0];
    response = await updateBookAPI.updateBook(data.id, data.title, data.author);
});

When('I try to update a book with empty body', async function(dataTable) {
    const data = dataTable.hashes()[0];
    response = await updateBookAPI.updateBookEmptyBody(Number(data.id));
});

When('I try to update a non-existent book', async function(dataTable) {
    const data = dataTable.hashes()[0];
    response = await updateBookAPI.updateBook(Number(data.id), data.title, data.author);
});

Then('the response status code should be aa {int}', async function(expectedStatus) {
    expect(response.status).toBe(expectedStatus);
});

Then('the response message should be aa {string}', async function(expectedMessage) {
    expect(response.body.message).toBe(expectedMessage);
});

After(async function() {
    // Cleanup after each scenario if needed
});

Given('I am logged in as user {string} with password {string}', async function(username, password) {
    updateBookAPI = new UpdateBookAPI();
    await updateBookAPI.init(username, password);
});