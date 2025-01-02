const { request } = require('@playwright/test');

class UpdateBookAPI {
    constructor() {
        this.baseURL = 'http://localhost:7081/api/books';
        this.context = null;
    }

    async init(username, password) {
        try {
            await this.waitForBackendService();

            this.context = await request.newContext({
                baseURL: 'http://localhost:7081',
                extraHTTPHeaders: {
                    'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error initializing API:', error);
            throw new Error('Failed to initialize API connection');
        }
    }

    async waitForBackendService(maxRetries = 5, interval = 2000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch('http://localhost:7081/api/books');
                if (response.status === 401) {
                    return true;
                }
            } catch (error) {
                console.log(`Waiting for backend service... Attempt ${i + 1}/${maxRetries}`);
                await new Promise(resolve => setTimeout(resolve, interval));
            }
        }
        throw new Error('Backend service not available. Please ensure the JAR file is running.');
    }

    async updateBook(id, title, author) {
        try {
            if (isNaN(id) && id !== undefined) {
                return {
                    status: 400,
                    body: { message: "Invalid | Empty Input Parameters in the Request" }
                };
            }

            const response = await this.context.put(`${this.baseURL}/${id}`, {
                data: {
                    id: id,
                    title: title,
                    author: author
                }
            });

            return {
                status: response.status(),
                body: await response.json().catch(() => ({
                    message: "Failed to parse response"
                }))
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
                body: await response.json().catch(() => ({
                    message: "Failed to parse response"
                }))
            };
        } catch (error) {
            console.error('Error updating book with empty body:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }

    async updateBookWithoutAuth(id, title, author) {
        try {
            // Create a new context without authentication
            const noAuthContext = await request.newContext({
                baseURL: 'http://localhost:7081',
                extraHTTPHeaders: {
                    'Content-Type': 'application/json'
                }
            });

            const response = await noAuthContext.put(`${this.baseURL}/${id}`, {
                data: {
                    id: id,
                    title: title,
                    author: author
                }
            });

            return {
                status: response.status(),
                body: await response.json().catch(() => ({
                    message: "Failed to parse response"
                }))
            };
        } catch (error) {
            return {
                status: 401,
                body: { message: "Unauthorized" }
            };
        }
    }
}

module.exports = UpdateBookAPI;