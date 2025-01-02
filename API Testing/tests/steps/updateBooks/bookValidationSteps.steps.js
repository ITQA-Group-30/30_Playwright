const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LibraryAPI = require('../../../src/pages/updateBooks/UpdateBookAPI');

let api;
let apiResponse;

Given('I am authenticated as {string} user with {string}', async function(username, password) {
    api = new LibraryAPI();
    await api.initialize(username, password);
});

When('I get all books', async function() {
    apiResponse = await api.getAllBooks();
});

When('I get book with id {int}', async function(id) {
    apiResponse = await api.getBookById(id);
});

When('I create a new book', async function(dataTable) {
    const data = dataTable.hashes()[0];
    apiResponse = await api.createBook(data.title, data.author, data.id ? Number(data.id) : null);
});

When('I update book with id {int}', async function(id, dataTable) {
    const data = dataTable.hashes()[0];
    apiResponse = await api.updateBook(id, data.title, data.author);
});

When('I delete book with id {int}', async function(id) {
    apiResponse = await api.deleteBook(id);
});

Then('API should respond with status code {int}', async function(expectedStatus) {
    expect(apiResponse.status).toBe(expectedStatus);
});

Then('API should return message {string}', async function(expectedMessage) {
    expect(apiResponse.body.message).toContain(expectedMessage);
});

Then('the response should contain a book with', async function(dataTable) {
    const expectedData = dataTable.hashes()[0];
    const book = apiResponse.body;
    expect(book.id).toBeDefined();
    if (expectedData.title) expect(book.title).toBe(expectedData.title);
    if (expectedData.author) expect(book.author).toBe(expectedData.author);
});