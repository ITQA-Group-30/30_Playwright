// File: src/pages/deleteBooks/DeleteBookPage.js
const { request } = require("@playwright/test");
const config = require("../../../src/utils/config");

class DeleteBookPage {
  constructor(baseURL = config.baseURL) {
    // Use baseURL from config.js
    this.baseURL = `${baseURL}/api/books`;
    this.context = null;
  }

  // Initialize API context with optional credentials
  async init(username = config.username, password = config.password) {
    if (this.context) {
      await this.context.dispose(); // Clear old context to avoid resource leaks
    }
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        Authorization:
          username && password
            ? `Basic ${Buffer.from(`${username}:${password}`).toString(
                "base64"
              )}`
            : undefined,
        "Content-Type": "application/json",
      },
    });
  }

  // Delete a book by ID
  async deleteBook(bookId) {
    if (!this.context) {
      throw new Error("API context is not initialized. Call init() first.");
    }
    if (!/^\d+$/.test(bookId)) {
      console.warn(`Invalid book ID format: ${bookId}`);
      return {
        status: 400,
        body: { message: "Invalid parameter 'id'." },
      };
    }
    try {
      const response = await this.context.delete(`/${bookId}`);
      const body = await response
        .json()
        .catch(() => ({ error: "Invalid JSON" }));
      console.log(`DeleteBook Response for ID ${bookId}:`, body);
      return { status: response.status(), body };
    } catch (error) {
      console.error(`Error deleting book with ID ${bookId}:`, error.message);
      return { status: 500, body: { message: error.message } };
    }
  }
}

module.exports = DeleteBookPage;
