const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LibraryAPI = require('../../src/pages/BookAPI_For_Update_02');

let api;
let apiResponse;

Given('I am authenticated as {string} user with {string}', async function(username, password) {
    api = new LibraryAPI();
    await api.initialize(username, password);
});

When('I perform book update with valid data', async function(dataTable) {
    const data = dataTable.hashes()[0];
    apiResponse = await api.updateBookDetails(Number(data.id), data.title, data.author);
});

When('I perform book update without title', async function(dataTable) {
    const data = dataTable.hashes()[0];
    apiResponse = await api.updateBookDetails(Number(data.id), data.title, data.author);
});

When('I perform book update without author', async function(dataTable) {
    const data = dataTable.hashes()[0];
    apiResponse = await api.updateBookDetails(Number(data.id), data.title, data.author);
});

Then('API should respond with status code {int}', async function(expectedStatus) {
    expect(apiResponse.status).toBe(expectedStatus);
});

Then('API should return message {string}', async function(expectedMessage) {
    expect(apiResponse.body.message).toContain(expectedMessage);
});