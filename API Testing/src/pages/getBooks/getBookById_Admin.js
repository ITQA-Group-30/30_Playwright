const { request } = require('playwright');

class BookAPI {
    async init(username, password) {
        this.context = await request.newContext({
            baseURL: 'http://localhost:7081', // Replace with the API's base URL
            extraHTTPHeaders: {
                Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
            },
        });
    }

    async createBook(book) {
        return await this.context.post('/api/books', {
            data: book,
        });
    }

    async getBookById(id) {
        return await this.context.get(`/api/books/${id}`);
    }

    async deleteBook(id) {
        return await this.context.delete(`/api/books/${id}`);
    }
}

module.exports = BookAPI;
