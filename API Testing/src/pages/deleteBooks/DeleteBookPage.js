class DeleteBookPage {
  constructor(request) {
    this.request = request;
    this.baseUrl = process.env.BASE_URL || "http://localhost:7081";
    this.headers = { "Content-Type": "application/json" };
  }

  /** Helper to create a book */
  async createBook(id, title = "Test Book", author = "Test Author") {
    const payload = { id, title, author };
    const response = await this.request.post(`${this.baseUrl}/api/books`, {
      data: payload,
      headers: this.headers,
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to create book: ${response.status()} ${await response.text()}`
      );
    }
    const responseBody = await response.json();
    return responseBody.id || id;
  }

  /** Helper to delete a book */
  async deleteBook(id, token = null) {
    const authHeaders = token
      ? { Authorization: `Bearer ${token}`, ...this.headers }
      : this.headers;

    const response = await this.request.delete(
      `${this.baseUrl}/api/books/${id}`,
      {
        headers: authHeaders,
      }
    );

    return response;
  }

  /** Helper to get a book by ID */
  async getBookById(id) {
    const response = await this.request.get(`${this.baseUrl}/api/books/${id}`);
    return response;
  }

  /** Helper to login and get token */
  async login(username, password) {
    const response = await this.request.post(`${this.baseUrl}/auth/login`, {
      data: { username, password },
      headers: this.headers,
    });

    if (!response.ok()) {
      throw new Error(
        `Login failed: ${response.status()} ${await response.text()}`
      );
    }
    const responseBody = await response.json();
    return responseBody.token;
  }
}

module.exports = DeleteBookPage;
