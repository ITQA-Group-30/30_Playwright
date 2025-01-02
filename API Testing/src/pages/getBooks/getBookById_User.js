const { request } = require('playwright');
const CONFIG = require('../../utils/config');

class BookAPI {
    async init() {
        const { baseURL, username, password } = CONFIG;
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
}

module.exports = BookAPI;
