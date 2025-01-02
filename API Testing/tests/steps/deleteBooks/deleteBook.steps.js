// File: tests/steps/deleteBook.steps.js
const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const DeleteBookPage = require("../../../src/pages/deleteBooks/DeleteBookPage");

setDefaultTimeout(30 * 1000);

let deleteBookPage;
let response;

Given(
  "I am logged in as {string} with password {string}",
  async function (username, password) {
    try {
      deleteBookPage = new DeleteBookPage();
      await deleteBookPage.init(username, password);
    } catch (error) {
      console.error(`Error during login: ${error.message}`);
      throw error;
    }
  }
);

Given("I am not logged in", async function (username, password) {
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init(username, password); // Reset context without authentication
});

Given("a book with ID {int} exists in the system", async function (bookId) {
  const bookDetails = {
    id: bookId,
    title: `Book ${bookId}`,
    author: `Author ${bookId}`,
  };
  response = await deleteBookPage.createBook(bookDetails);
  expect([201, 208]).toContain(response.status); // Ensure book creation
  console.log(`Book with ID ${bookId} created:`, response.body);
});

When("I delete the book with ID {int}", async function (bookId) {
  response = await deleteBookPage.deleteBook(bookId);
  console.log(`Delete response for book ID ${bookId}:`, response.body);
});

When("I delete the book with ID {string}", async function (bookId) {
  response = await deleteBookPage.deleteBook(bookId);
  console.log(`Delete response for book ID ${bookId}:`, response.body);
});

Then("the response status code should be {int}", async function (statusCode) {
  expect(response.status).toBe(statusCode);
});

Then(
  "the response message should be {string}",
  async function (expectedMessage) {
    const actualMessage = response.body?.message || response.body?.error || "";
    console.log("Actual Message:", actualMessage); // Debug log
    expect(actualMessage).toBe(expectedMessage);
  }
);
