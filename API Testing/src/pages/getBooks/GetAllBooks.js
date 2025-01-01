const { request } = require('playwright');

class BookAPI {
    async init(username, password) {
        this.context = await request.newContext({
            baseURL: 'http://localhost:7081', // Replace with your API base URL
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

    async getAllBooks() {
        return await this.context.get('/api/books');
    }

    async deleteAllBooks() {
        // Assuming a DELETE API for clearing books exists
        return await this.context.delete('/api/books');
    }
}

module.exports = BookAPI;
