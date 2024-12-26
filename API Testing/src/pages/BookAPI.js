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

    async updateBook(id, title, author) {
        try {
            const response = await this.context.put(`${this.baseURL}/${id}`, {
                data: {
                    id: id,
                    title: title,
                    author: author
                }
            });
            
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error updating book:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async updateBookEmptyBody(id) {
        try {
            const response = await this.context.put(`${this.baseURL}/${id}`, {
                data: {}
            });
            
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error updating book with empty body:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }
}

module.exports = BookAPI;