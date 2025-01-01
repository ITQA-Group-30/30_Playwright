class DeleteBookPage {
  constructor(request) {
    this.request = request;
    this.baseUrl = process.env.BASE_URL || "http://localhost:7081";
    this.headers = { "Content-Type": "application/json" };
  }

  /**
   * Create a book
   * @param {number|null} id - Optional book ID
   * @param {string} title - Book title
   * @param {string} author - Book author
   * @returns {Promise<number>} - Created book ID
   */
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
    if (!responseBody.id && id == null) {
      throw new Error("Response does not contain a valid book ID.");
    }

    return responseBody.id || id;
  }

  /**
   * Delete a book by ID
   * @param {number} id - Book ID
   * @param {string|null} token - Optional authentication token
   * @returns {Promise<Response>} - API response
   */
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

    if (response.status === 404) {
      throw new Error("Book not found.");
    }

    return response;
  }

  /**
   * Get a book by ID
   * @param {number} id - Book ID
   * @returns {Promise<Response>} - API response
   */
  async getBookById(id) {
    const response = await this.request.get(`${this.baseUrl}/api/books/${id}`);
    if (response.status === 404) {
      throw new Error("Book not found.");
    }
    return response;
  }

  /**
   * Login and retrieve token
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<string>} - Authentication token
   */
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
    if (!responseBody.token) {
      throw new Error("Login response does not contain a token.");
    }

    return responseBody.token;
  }
}

module.exports = DeleteBookPage;
