
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BookAPI = require('../../../src/pages/getBooks/getBookById_User');

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;
let createdBook;

Given('I am authenticated as admin user a', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init('admin', 'password');
});

Given('a book exists in the database', async function () {
    // Create a sample book for testing
    createdBook = await bookAPI.createBook({
        title: 'Admin Sample Book',
        author: 'Admin Author'
    });
    bookId = createdBook.body.id;
});

When('the admin sends a GET request to fetch the book a', async function () {
    response = await bookAPI.getBookById(bookId);
});

When('the admin sends a GET request with negative book id a {string}', async function (id) {
    response = await bookAPI.getBookById(parseInt(id));
});

Then('the admin response status code should be a {int}', async function (expectedStatus) {
    expect(response.status).toBe(expectedStatus);
});

Then('the admin response should contain correct book details for the given id a', async function () {
    const book = response.body;
    expect(book.id).toBe(bookId);
    expect(book.title).toBe('Admin Sample Book');
    expect(book.author).toBe('Admin Author');
});

Then('the error message should be a {string}', async function (expectedMessage) {
    expect(response.body.message).toBe(expectedMessage);
});

