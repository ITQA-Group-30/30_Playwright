const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BookAPI } = require('../../../src/test'); // Adjust the path as necessary

setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;

// Scenario: Valid Admin Request with Valid Book ID
Given('an admin creates a book in the database with a valid id', async function () {
    bookAPI = new BookAPI();
    await bookAPI.init('admin', 'password'); // Authenticate as admin

    const book = {
        title: 'Admin Sample Book',
        author: 'Admin Author',
        price: 15.99,
    };

    response = await bookAPI.createBook(book);
    expect(response.status()).toBe(201);

    const createdBook = await response.json();
    bookId = createdBook.id; // Save the created book's ID
});

When('the admin sends a GET request to {int}', async function (id) {
    response = await bookAPI.getBookById(bookId); // Fetch book by ID
});

Then('the admin response status code should be {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
});

Then('the admin response should contain correct book details for the given id', async function () {
    const book = await response.json();
    expect(book.id).toBe(bookId);
    expect(book.title).toBe('Admin Sample Book');
    expect(book.author).toBe('Admin Author');
});

// Scenario: Admin Request for a Non-existent Book
Given('a book does not exist in the database with the given id for admin', async function () {
    bookId = 'invalid-id'; // Use an invalid book ID
});

When('the admin sends a GET request to {int} for a non-existent book', async function () {
    response = await bookAPI.getBookById(bookId);
});

Then('the admin response status code should be {int} for not found', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
});

Then('the admin response should indicate that the book was not found', async function () {
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Not Found'); // Adjust error message if needed
});
