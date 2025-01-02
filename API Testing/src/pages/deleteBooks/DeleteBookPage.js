// File: src/pages/deleteBooks/DeleteBookPage.js
const { request } = require("@playwright/test");

class DeleteBookPage {
  constructor(baseURL = process.env.BASE_URL || "http://localhost:7081") {
    this.baseURL = `${baseURL}/api/books`;
    this.context = null;
  }

  async init(username, password) {
    if (this.context) {
      await this.context.dispose(); // Clear old context
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
  async createBook(bookDetails) {
    console.log("Payload sent to createBook API:", bookDetails); // Log payload
    const response = await this.context.post("", { data: bookDetails });
    const body = await response.json().catch(() => ({ error: "Invalid JSON" }));
    console.log("CreateBook Response:", body); // Log response
    return { status: response.status(), body };
  }

  async deleteBook(bookId) {
    if (!this.context) {
      throw new Error("API context is not initialized. Call init() first.");
    }
    if (!/^\d+$/.test(bookId)) {
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
      return {
        status: response.status(),
        body,
      };
    } catch (error) {
      console.error(`Error deleting book with ID ${bookId}:`, error);
      return { status: 500, body: { message: error.message } };
    }
  }
}

module.exports = DeleteBookPage;
