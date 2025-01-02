// const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
// const { expect } = require('@playwright/test');
// const BookAPI = require('../../src/pages/BookAPI_For_Update_01');
//
// // Increase timeout to 30 seconds
// setDefaultTimeout(30 * 1000);
//
// let bookAPI;
// let response;
//
// Given('I am logged in as {string} with password {string}', async function(username, password) {
//     bookAPI = new BookAPI();
//     await bookAPI.init(username, password);
// });
//
// When('I try to update a book with invalid ID type', async function(dataTable) {
//     const data = dataTable.hashes()[0];
//     response = await bookAPI.updateBook(data.id, data.title, data.author);
// });
//
// When('I try to update a book with empty body', async function(dataTable) {
//     const data = dataTable.hashes()[0];
//     response = await bookAPI.updateBookEmptyBody(Number(data.id));
// });
//
// When('I try to update a non-existent book', async function(dataTable) {
//     const data = dataTable.hashes()[0];
//     response = await bookAPI.updateBook(Number(data.id), data.title, data.author);
// });
//
// Then('the response status code should be {int}', async function(expectedStatus) {
//     expect(response.status).toBe(expectedStatus);
// });
//
// Then('the response message should be {string}', async function(expectedMessage) {
//     expect(response.body.message).toBe(expectedMessage);
// });
