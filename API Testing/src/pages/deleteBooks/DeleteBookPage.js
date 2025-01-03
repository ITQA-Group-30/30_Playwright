const { request } = require("@playwright/test");
const Authentication = require("../../Authentication/Authentication");
const CONFIG = require("../../../src/utils/config");

class DeleteBookPage {
  constructor() {
    this.context = null;
    this.baseURL = `${CONFIG.baseURL}/api/books`;
    this.auth = new Authentication();
  }

  async init() {
    try {
      await this.waitForBackendService();
      this.context = await this.auth.init(CONFIG.username, CONFIG.password);
    } catch (error) {
      console.error("Error initializing BookAPI:", error);
      throw new Error("Failed to initialize BookAPI");
    }
  }

  async waitForBackendService(maxRetries = 5, interval = 2000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(this.baseURL);
        if (response.status === 401) {
          // Service is up but requires auth
          return true;
        }
      } catch (error) {
        console.log(
          `Waiting for backend service... Attempt ${i + 1}/${maxRetries}`
        );
        if (i === maxRetries - 1) {
          throw new Error(
            "Backend service not available. Please ensure the JAR file is running."
          );
        }
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
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
    const deleteURL = `${this.baseURL}/${bookId}`;
    try {
      console.log(`Sending DELETE request to: ${deleteURL}`);
      const response = await this.context.delete(deleteURL);
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
