const {
  Given,
  When,
  Then,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const DeleteBookPage = require("../../../src/pages/deleteBooks/DeleteBookPage");

setDefaultTimeout(30 * 1000);

let deleteBookPage;
let response;

Given("I am logged in as an authorized admin user", async function () {
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init("admin", "adminpassword");
});

Given("I am logged in as an unauthorized user", async function () {
  deleteBookPageI = new DeleteBookPage();
  await deleteBookPageI.init("user", "password");
});

Given("I am not logged in", async function () {
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init(null, null);
});

When("I delete the book with ID {int}", async function (bookId) {
  response = await deleteBookPage.deleteBook(bookId);
});

When("I delete the book with ID {string}", async function (bookId) {
  response = await deleteBookPage.deleteBook(bookId);
});

When("I try to delete a book without authentication", async function () {
  response = await deleteBookPage.deleteBookWithoutAuth(1); // Pass a test book ID
});

Then(
  "the response status code should be {int}",
  async function (expectedStatus) {
    expect(response.status).toBe(expectedStatus);
  }
);

Then(
  "the response message should be {string}",
  async function (expectedMessage) {
    expect(response.body.message).toBe(expectedMessage);
  }
);

After(async function () {
  // Cleanup if needed
});
