const { request } = require('@playwright/test');

class BookAPI {
    constructor() {
        this.baseURL = 'http://localhost:7081/api/books';
        this.context = null;
    }

    async init(username, password) {
        this.context = await request.newContext({
            baseURL: 'http://localhost:7081',
            extraHTTPHeaders: {
                'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async createBook(bookDetails) {
        try {
            const response = await this.context.post(this.baseURL, {
                data: bookDetails
            });
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error creating book:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async getAllBooks() {
        try {
            const response = await this.context.get(this.baseURL);
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error fetching all books:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }
}

module.exports = BookAPI;
