// File: tests/steps/deleteBook.steps.js
const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const config = require("../../../src/utils/config");
const DeleteBookPage = require("../../../src/pages/deleteBooks/DeleteBookPage");

setDefaultTimeout(30 * 1000);

let deleteBookPage;
let response;

// Log in as an authorized admin user
Given("I am logged in as an authorized admin user", async function () {
  try {
    deleteBookPage = new DeleteBookPage();
    await deleteBookPage.init(config.username, config.password);
    console.log(`Logged in as admin user: ${config.username}`);
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    throw error;
  }
});

// Log in as an unauthorized user
Given("I am logged in as an unauthorized user", async function () {
  try {
    deleteBookPage = new DeleteBookPage();
    await deleteBookPage.init("user", "password"); // Hardcoded unauthorized credentials
    console.log("Logged in as unauthorized user: user");
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    throw error;
  }
});

// Initialize without authentication
Given("I am not logged in", async function () {
  try {
    deleteBookPage = new DeleteBookPage();
    await deleteBookPage.init(null, null); // No authentication headers
    console.log("Initialized context without authentication");
  } catch (error) {
    console.error(`Error initializing context: ${error.message}`);
    throw error;
  }
});

// Delete a book by ID (handles both {int} and {string})
When("I delete the book with ID {string}", async function (bookId) {
  try {
    response = await deleteBookPage.deleteBook(bookId);
    console.log(`Delete response for book ID ${bookId}:`, response.body);
  } catch (error) {
    console.error(`Error deleting book with ID ${bookId}: ${error.message}`);
    throw error;
  }
});

// Redirect {int} step to {string} by converting {int} to {string}
When("I delete the book with ID {int}", async function (bookId) {
  const stringId = bookId.toString();
  response = await deleteBookPage.deleteBook(stringId);
  console.log(`Delete response for book ID ${stringId}:`, response.body);
});

// Validate the response status code
Then("the response status code should be {int}", async function (statusCode) {
  console.log(
    `Validating status code: Expected ${statusCode}, Received ${response.status}`
  );
  expect(response.status).toBe(statusCode);
});

// Validate the response message
Then(
  "the response message should be {string}",
  async function (expectedMessage) {
    const actualMessage =
      response.body?.message || response.body?.error || "<No message>";
    console.log(
      `Validating response message: Expected "${expectedMessage}", Received "${actualMessage}"`
    );
    expect(actualMessage).toBe(expectedMessage);
  }
);
