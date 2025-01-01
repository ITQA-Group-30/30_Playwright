const { request } = require('@playwright/test');

class BooksAPI {
  constructor(baseUrl = 'http://localhost:7081') {
    this.baseUrl = baseUrl;
    this.adminAuth = Buffer.from('admin:password').toString('base64');
    this.userAuth = Buffer.from('user:password').toString('base64');
  }

  async init() {
    this.context = await request.newContext();
  }

  async dispose() {
    await this.context?.dispose();
  }

  async getAllBooks(auth) {
    return await this.context.get(`${this.baseUrl}/api/books`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
  }

  async getBookById(id, auth) {
    return await this.context.get(`${this.baseUrl}/api/books/${id}`, {
        headers: {
            'Authorization': `Basic ${auth}`,
        },
    });
  }

  async createBook(book, auth) {
    return await this.context.post(`${this.baseUrl}/api/books`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      data: book
    });
  }

  async updateBook(id, book, auth) {
    return await this.context.put(`${this.baseUrl}/api/books/${id}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      data: book
    });
  }

  async deleteBook(id, auth) {
    return await this.context.delete(`${this.baseUrl}/api/books/${id}`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
  }
}

module.exports = { BooksAPI };