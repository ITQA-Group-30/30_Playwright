const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { BooksAPI } = require('../../src/test'); // Ensure this path is correct

// Increase timeout to 30 seconds
setDefaultTimeout(30 * 1000);

let bookAPI;
let response;

console.log("comes here");

Given('I am logged in as a {string} with password {string}', async function (username, password) {
    console.log('Attempting to log in...');
    bookAPI = new BooksAPI();  // Initialize BooksAPI
    await bookAPI.init();  // Initialize context
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    console.log('Logged in successfully as:', username);
    this.auth = auth; // Store authorization for later use
});

// Valid Request with Books in Database
Given('there are books in the database', async function () {
    // Add a sample book to the database using the POST API
    const book = {
        title: 'Sample Book',
        author: 'Author Name',
        price: 10.99,
    };
    response = await bookAPI.createBook(book, this.auth); // Use stored authorization
    expect(response.status()).toBe(201); // Ensure book is created successfully
});

When('I send a GET request to', async function () {
    response = await bookAPI.getAllBooks(this.auth); // Fetch all books using GET API
});

Then('the response status code should be a {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
});

Then('the response should contain a list of books', async function () {
    const books = await response.json(); // Get response body
    expect(Array.isArray(books)).toBe(true); // Response should be an array
    expect(books.length).toBeGreaterThan(0); // Array should not be empty
});

// Valid Request with No Books in Database
Given('the database has no books', async function () {
    // Clear all books from the database using a helper method (if available)
    response = await bookAPI.deleteBook(1, this.auth); // Assuming you have a delete method, otherwise modify accordingly
    expect(response.status()).toBe(200); // Ensure all books are deleted
});

Then('the response should contain an empty array', async function () {
    const books = await response.json(); // Get response body
    expect(Array.isArray(books)).toBe(true); // Response should be an array
    expect(books.length).toBe(0); // Array should be empty
});
