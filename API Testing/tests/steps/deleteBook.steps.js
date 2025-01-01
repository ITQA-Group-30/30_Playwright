const { Given, When, Then, After } = require("@cucumber/cucumber");
const { test, expect } = require("@playwright/test");
const DeleteBookPage = require("../../src/pages/DeleteBookPage");

const BASE_URL = process.env.BASE_URL || "http://localhost:7081";
const HEADERS = { "Content-Type": "application/json" };
let response;
let createdBookId;

/** Step to ensure the application is running */
Given("the application is running", async () => {
  try {
    const res = await test.request.get(`${BASE_URL}/health`);
    if (!res.ok()) {
      throw new Error(
        `Application is not running. Response: ${res.status()} ${await res.text()}`
      );
    }
  } catch (err) {
    throw new Error("Application is not running or unreachable.");
  }
});

/** Helper function to create a book */
async function createBook(id, title = "Test Book", author = "Test Author") {
  const payload = { id, title, author };
  const res = await test.request.post(`${BASE_URL}/api/books`, {
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
  const res = await test.request.delete(`${BASE_URL}/api/books/${id}`);
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
  const res = await test.request.post(`${BASE_URL}/auth/login`, {
    data: credentials,
    headers: HEADERS,
  });
  if (!res.ok()) {
    throw new Error(`Login failed for role: ${role}`);
  }
  return (await res.json()).token;
}

// Step definitions
Given("a book exists with ID {int}", async (id) => {
  const res = await createBook(id);
  expect(res.status()).toBe(201); // Assert successful creation
});

When("I send a DELETE request to {string}", async (endpoint) => {
  response = await test.request.delete(`${BASE_URL}${endpoint}`);
});

When(
  "I send a DELETE request to {string} without authentication",
  async (endpoint) => {
    const context = await test.newContext(); // Create a new context without authentication
    const request = await context.newRequest();
    response = await request.delete(`${BASE_URL}${endpoint}`);
  }
);

Given("I am logged in as {string}", async (role) => {
  const token = await login(role);
  test.use({ extraHTTPHeaders: { Authorization: `Bearer ${token}` } });
});

Then("the response status should be {int}", (expectedStatus) => {
  expect(response.status()).toBe(expectedStatus);
});

Then("the book should no longer exist", async () => {
  const getResponse = await test.request.get(
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
});
