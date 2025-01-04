const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/getBooks/getBookById_Admin');
const CONFIG = require('../../../src/utils/config');


setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;
let createdBook;

Given('I am authenticated as admin user', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init(CONFIG.username, CONFIG.password);
});


When('the admin sends a GET request to fetch the book', async function () {
    response = await bookAPI.getBookById(bookId);
});

When('the admin sends a GET request with negative book id {string}', async function (id) {
    response = await bookAPI.getBookById(parseInt(id));
});

Then('the admin response status code should be {int}', async function (expectedStatus) {
    expect(response.status).toBe(expectedStatus);
});

Then('the admin response should contain correct book details for the given id', async function () {
    const book = response.body;
    expect(book.id).toBe(bookId);
    expect(book.title).toBe('Admin Sample Book');
    expect(book.author).toBe('Admin Author');
});

Then('the error message should be {string}', async function (expectedMessage) {
    expect(response.body.message).toBe(expectedMessage);
});