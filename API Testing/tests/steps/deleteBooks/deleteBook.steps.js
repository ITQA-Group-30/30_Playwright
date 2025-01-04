const {
  Given,
  When,
  Then,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const DeleteBookPage = require("../../../src/pages/deleteBooks/DeleteBookPage");
const CONFIG = require("../../../src/utils/config");

setDefaultTimeout(30 * 1000);

let deleteBookPage;
let response;

Given("I am logged in as an authorized admin user", async function () {
  // Initialize deleteBookPage and log in as admin
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init(CONFIG.username, CONFIG.password);
});

Given("I am logged in as an unauthorized user", async function () {
  // Initialize deleteBookPage and log in as an unauthorized user
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init("user", "password");
});

Given("I am not logged in", async function () {
  // Initialize deleteBookPage without authentication
  deleteBookPage = new DeleteBookPage();
  
  await deleteBookPage.init(null, null); // No username or password

});

When("I delete the book with ID {int}", async function (bookId) {
  // Attempt to delete a book by ID
  response = await deleteBookPage.deleteBook(bookId);
  console.log(`DeleteBook Response for ID ${bookId}:`, response);
});

When("I delete the book with ID {string}", async function (bookId) {
  // Attempt to delete a book by ID (string type)
  response = await deleteBookPage.deleteBook(bookId);
  console.log(`DeleteBook Response for ID ${bookId}:`, response);
});

When("I try to delete a book without authentication", async function () {
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init(null, null);
  response = await deleteBookPage.deleteBookWithoutAuth(103);
  console.log("Response for unauthenticated delete:", response);
});

Then(
  "the response status code should be {int}",
  async function (expectedStatus) {
    // Assert the status code of the response
    console.log("Actual Response Status:", response.status);
    expect(response.status).toBe(expectedStatus);
  }
);

Then(
  "the response message should be {string}",
  async function (expectedMessage) {
    // Assert the response message or error
    console.log("Actual Response Body:", response.body);
    expect(response.body.message || response.body.error).toBe(expectedMessage);
  }
);

After(async function () {
  // Cleanup after each scenario
  if (deleteBookPage && deleteBookPage.authToken) {
    await deleteBookPage.logout();
  }
});
