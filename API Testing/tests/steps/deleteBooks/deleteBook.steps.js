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
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init(CONFIG.username, CONFIG.password);
});

Given("I am logged in as an unauthorized user", async function () {
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init("user", "password");
});

Given("I am not logged in", async function () {
  deleteBookPage = new DeleteBookPage();
  await deleteBookPage.init(null, null); // No username or password
});

When("I delete the book with ID {int}", async function (bookId) {
  response = await deleteBookPage.deleteBook(bookId);
  console.log(`DeleteBook Response for ID ${bookId}:`, response);
});

When("I delete the book with ID {string}", async function (bookId) {
  response = await deleteBookPage.deleteBook(bookId);
  console.log(`DeleteBook Response for ID ${bookId}:`, response);
});

When("I try to delete a book without authentication", async function () {
  response = await deleteBookPage.deleteBookWithoutAuth(103);
  console.log("Response for unauthenticated delete:", response);
});

Then(
  "the response status code should be {int}",
  async function (expectedStatus) {
    console.log("Actual Response Status:", response.status);
    expect(response.status).toBe(expectedStatus);
  }
);

Then(
  "the response message should be {string}",
  async function (expectedMessage) {
    console.log("Actual Response Body:", response.body);
    expect(response.body.message || response.body.error).toBe(expectedMessage);
  }
);

After(async function () {
  // Cleanup if needed
});
