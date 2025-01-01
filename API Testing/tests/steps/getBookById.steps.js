const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BooksAPI } = require('../../src/test'); // Ensure path is correct

// Increase timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let bookAPI;
let response;
let bookId;  // Store book ID for later use

Given('a book exists in the database with a valid id', async function () {
    bookAPI = new BooksAPI();  // Initialize BooksAPI
    await bookAPI.init();  // Initialize context

    // Create a book for testing
    const book = {
        title: 'Sample Book',
        author: 'Author Name',
        price: 10.99,
    };

    response = await bookAPI.createBook(book, 'admin:password'); // Create book with admin credentials
    expect(response.status()).toBe(201);  // Ensure book is created successfully

    const createdBook = await response.json();
    bookId = createdBook.id;  // Save the book ID for later use
});

When('I send a GET request to /api/books/{int}', async function (id) {
    // Replace the {id} with the actual bookId
    response = await bookAPI.getBookById(bookId, 'admin:password');  // Fetch book details using the stored bookId
});

Then('the response status code should be {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
});

Then('the response should contain the correct book details for the given id', async function () {
    const book = await response.json();  // Get the book details from the response
    expect(book.id).toBe(bookId);  // Ensure the ID matches the stored bookId
    expect(book.title).toBe('Sample Book');  // Ensure the title is correct
    expect(book.author).toBe('Author Name');  // Ensure the author is correct
});

Given('no book exists in the database with the given id', async function () {
    // Ensure the book ID does not exist in the database
    bookId = 'invalid-id';  // Set an invalid book ID for testing
});

When('I send a GET request to /api/books/{int} with an invalid id', async function () {
    response = await bookAPI.getBookById(bookId, 'admin:password');  // Fetch book with an invalid ID
});

Then('the response status code should be {int} for not found', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);  // Expect a 404 status
});

Then('the response should indicate that the book was not found', async function () {
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Not Found');  // Assuming the error message is 'Not Found'
});

Given('the user is not authorized', async function () {
    bookAPI = new BooksAPI();  // Initialize BooksAPI
    await bookAPI.init();  // Initialize context
});

When('I send a GET request to /api/books/{int} with an invalid authorization token', async function () {
    // Send request with an invalid token (or no token)
    response = await bookAPI.getBookById(bookId, 'invalid-token');  // Use an invalid token
});

Then('the response status code should be {int} for unauthorized', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);  // Expect a 401 status
});
