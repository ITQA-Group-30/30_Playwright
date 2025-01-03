const Authentication = require('../../Authentication/Authentication');

class BookAPI {
    constructor() {
        this.auth = new Authentication(); // Initialize the Authentication instance
        this.context = null; // Placeholder for the authenticated context
    }

    async init(username, password) {
        // Use the Authentication class to initialize the context
        this.context = await this.auth.init(username, password);
    }

    async createBook(book) {
        // Ensure the context is initialized before making API requests
        if (!this.context) {
            throw new Error('Context not initialized. Call init() first.');
        }
        return await this.context.post('/api/books', {
            data: book,
        });
    }

    async getAllBooks() {
        if (!this.context) {
            throw new Error('Context not initialized. Call init() first.');
        }
        return await this.context.get('/api/books');
    }

    async deleteAllBooks() {
        if (!this.context) {
            throw new Error('Context not initialized. Call init() first.');
        }
        return await this.context.delete('/api/books');
    }
}

module.exports = BookAPI;
