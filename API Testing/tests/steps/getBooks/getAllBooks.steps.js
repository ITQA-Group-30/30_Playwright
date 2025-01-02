const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BooksAPI } = require('../../../src/pages/getBooks/getBookById_User');

// Increase timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

console.log("comes here");

Given('I am logged in as a {string} with password {string}', async function (username, password) {
    console.log('Attempting to log in...');
    bookAPI = new BooksAPI(); // Initialize BooksAPI
    await bookAPI.init(); // Initialize context
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    console.log('Generated auth:', auth); // Log the generated auth string
    this.auth = auth; // Store authorization for later use
});

When('I send a GET request to', async function () {
    console.log('Sending GET request with auth:', this.auth);
    response = await bookAPI.getAllBooks(this.auth); // Fetch all books using GET API
    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());
});

Given('there are books in the database', async function () {
    // Add a sample book to the database using the POST API
    const book = {
        title: 'Sample Book',
        author: 'Author Name',
        price: 10.99,
    };
    console.log('Adding a book to the database:', book);
    response = await bookAPI.createBook(book, this.auth); // Use stored authorization
    expect(response.status()).toBe(201); // Ensure book is created successfully
    console.log('Book added successfully.');
});

Then('the response status code should be a {int}', async function (expectedStatus) {
    console.log('Validating response status...');
    expect(response.status()).toBe(expectedStatus);
    console.log('Response status is correct:', expectedStatus);
});

Then('the response should contain a list of books', async function () {
    console.log('Validating response contains a list of books...');
    const books = await response.json(); // Get response body
    console.log('Books:', books);
    expect(Array.isArray(books)).toBe(true); // Response should be an array
    expect(books.length).toBeGreaterThan(0); // Array should not be empty
    console.log('Response contains a list of books.');
});

Given('the database has no books', async function () {
    console.log('Ensuring the database has no books...');
    response = await bookAPI.deleteBook(1, this.auth); // Assuming a delete method exists
    expect(response.status()).toBe(200); // Ensure all books are deleted
    console.log('All books cleared from the database.');
});

Then('the response should contain an empty array', async function () {
    console.log('Validating response contains an empty array...');
    const books = await response.json(); // Get response body
    console.log('Books:', books);
    expect(Array.isArray(books)).toBe(true); // Response should be an array
    expect(books.length).toBe(0); // Array should be empty
    console.log('Response contains an empty array.');
});
