const { request } = require('@playwright/test');
const CONFIG = require('../../utils/config');

class BookAPI {
    constructor() {
        this.context = null;
        this.baseURL = `${CONFIG.baseURL}/api/books`;
    }

    async init() {
        this.context = await request.newContext({
            baseURL: CONFIG.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Basic ${Buffer.from(`${CONFIG.username}:${CONFIG.password}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async createBook(bookDetails) {
        try {
            const response = await this.context.post(this.baseURL, {
                data: bookDetails,
            });
            return {
                status: response.status(),
                body: await response.json().catch(() => ({})),
            };
        } catch (error) {
            console.error('Error creating book:', error);
            return {
                status: 500,
                body: { message: error.message },
            };
        }
    }
}

module.exports = BookAPI;
