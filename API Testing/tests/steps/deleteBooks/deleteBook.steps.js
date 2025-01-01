const { Given, When, Then, After } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const DeleteBookPage = require("../../../src/pages/deleteBooks/DeleteBookPage");

const BASE_URL = process.env.BASE_URL || "http://localhost:7081";
const HEADERS = { "Content-Type": "application/json" };

let browser; // Browser instance
let context; // Browser context
let requestContext; // API request context
let deleteBookPage; // Page object
let response;
let createdBookId;

/** Helper function to create a book */
async function createBook(id, title = "Test Book", author = "Test Author") {
  const payload = { id, title, author };
  const res = await requestContext.post(`${BASE_URL}/api/books`, {
    data: payload,
    headers: HEADERS,
  });
  if (!res.ok()) {
    throw new Error(
      `Book creation failed: ${res.status()} ${await res.text()}`
    );
  }
  createdBookId = id || (await res.json()).id;
  return res;
}

/** Helper function to delete a book */
async function deleteBook(id) {
  const res = await requestContext.delete(`${BASE_URL}/api/books/${id}`);
  if (!res.ok() && res.status() !== 404) {
    console.error(`Cleanup failed: ${res.status()} ${await res.text()}`);
  }
  return res;
}

/** Helper function to simulate login */
async function login(role) {
  const credentials = {
    username: role === "admin" ? "admin" : "user",
    password: "password",
  };
  const res = await requestContext.post(`${BASE_URL}/auth/login`, {
    data: credentials,
    headers: HEADERS,
  });
  if (!res.ok()) {
    throw new Error(`Login failed for role: ${role}`);
  }
  return (await res.json()).token;
}

// Step definitions
Given("the application is running", async () => {
  // Launch the browser and set up a request context
  browser = await chromium.launch(); // Launch browser using Playwright's chromium
  context = await browser.newContext();
  requestContext = await context.request; // Correctly set up API request context
  deleteBookPage = new DeleteBookPage(requestContext);

  // Check if the application is accessible
  const healthCheck = await requestContext.get(BASE_URL);
  expect(healthCheck.ok()).toBe(true);
});

Given("a book exists with ID {int}", async (id) => {
  const res = await createBook(id);
  expect(res.status()).toBe(201); // Assert successful creation
});

When("I send a DELETE request to {string}", async (endpoint) => {
  response = await requestContext.delete(`${BASE_URL}${endpoint}`);
});

When(
  "I send a DELETE request to {string} without authentication",
  async (endpoint) => {
    // Create a context without authentication
    const unauthenticatedContext = await browser.newContext();
    const unauthenticatedRequest = unauthenticatedContext.request;
    response = await unauthenticatedRequest.delete(`${BASE_URL}${endpoint}`);
    await unauthenticatedContext.close(); // Clean up
  }
);

Given("I am logged in as {string}", async (role) => {
  const token = await login(role);
  requestContext.setExtraHTTPHeaders({ Authorization: `Bearer ${token}` });
});

Then("the response status should be {int}", (expectedStatus) => {
  expect(response.status()).toBe(expectedStatus);
});

Then("the book should no longer exist", async () => {
  const getResponse = await requestContext.get(
    `${BASE_URL}/api/books/${createdBookId}`
  );
  expect(getResponse.status()).toBe(404); // Assert book is deleted
});

// Cleanup step after the test runs
After(async () => {
  if (createdBookId) {
    await deleteBook(createdBookId); // Cleanup any leftover data
    createdBookId = null; // Reset the ID
  }
  if (context) await context.close(); // Close browser context
  if (browser) await browser.close(); // Close the browser
});
