const { request } = require('playwright');
const config = require('./config'); // Adjust the path to where your config file is located

class BookAPI {
    async init() {
        const { baseURL, username, password } = config;

        this.context = await request.newContext({
            baseURL: baseURL, // Dynamically set the API's base URL
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
