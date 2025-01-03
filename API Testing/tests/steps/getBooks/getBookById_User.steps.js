const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BooksAPI } = require('../../../src/pages/getBooks/GetAllBooks');

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;

Given('a book exists in the database with a valid id', async function () {
    bookAPI = new BooksAPI();
    await bookAPI.init();

    const book = { title: 'User Book', author: 'User Author', price: 15.99 };
    response = await bookAPI.createBook(book, 'user:password');
    expect(response.status()).toBe(201);

    const createdBook = await response.json();
    bookId = createdBook.id;
});

When('a user sends a GET request to {int}', async function (id) {
    response = await bookAPI.getBookById(bookId, 'user:password');
});

Then('the response status code should be {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
});

Then('the response should contain the correct book details for the given id', async function () {
    const book = await response.json();
    expect(book.id).toBe(bookId);
    expect(book.title).toBe('User Book');
    expect(book.author).toBe('User Author');
});

Given('the user is not authorized', async function () {
    bookAPI = new BooksAPI();
    await bookAPI.init();
});

When('a user sends a GET request to {int} with an invalid token', async function () {
    response = await bookAPI.getBookById(bookId, 'invalid-token');
});

Then('the response should indicate unauthorized access', async function () {
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Unauthorized');
});
