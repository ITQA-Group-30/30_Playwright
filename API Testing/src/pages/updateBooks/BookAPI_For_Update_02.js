const { request } = require('@playwright/test');

class LibraryAPI {
    constructor() {
        this.baseUrl = 'http://localhost:7081/api/books';
        this.apiContext = null;
    }

    async initialize(username, password) {
        this.apiContext = await request.newContext({
            baseURL: 'http://localhost:7081',
            extraHTTPHeaders: {
                'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async updateBookDetails(id, title, author) {
        try {
            const response = await this.apiContext.put(`${this.baseUrl}/${id}`, {
                data: { id, title, author }
            });

            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async close() {
        if (this.apiContext) {
            await this.apiContext.dispose();
        }
    }
}

module.exports = LibraryAPI;