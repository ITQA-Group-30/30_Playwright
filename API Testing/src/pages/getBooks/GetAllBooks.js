const { request } = require('playwright');
const CONFIG = require('../../utils/config');

class BookAPI {
    async init() {
        const { baseURL, username, password } = CONFIG;
        this.context = await request.newContext({
            baseURL: `${baseURL}/api/books`, // Dynamically set the API base URL
            extraHTTPHeaders: {
                Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
            },
        });
    }

    async createBook(book) {
        return await this.context.post('', { // Endpoint path is relative to baseURL
            data: book,
        });
    }

    async getAllBooks() {
        return await this.context.get(''); // Fetch all books
    }

    async deleteAllBooks() {
        // Assuming a DELETE API for clearing books exists
        return await this.context.delete('');
    }
}

module.exports = BookAPI;
