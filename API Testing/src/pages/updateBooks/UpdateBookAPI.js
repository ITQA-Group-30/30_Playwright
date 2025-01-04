
const { request } = require('@playwright/test');
const Authentication = require('../../Authentication/Authentication');
const CONFIG = require('../../utils/config');

class UpdateBookAPI {
    constructor() {
        this.auth = new Authentication();
        this.baseURL = `${CONFIG.baseURL}/api/books`;
        this.context = null;
    }

    async init(username, password) {
        try {
            await this.waitForBackendService();
            this.context = await this.auth.init(username, password);
            return this;
        } catch (error) {
            throw new Error(`Failed to initialize UpdateBookAPI: ${error.message}`);
        }
    }

    async waitForBackendService(maxRetries = 5, interval = 2000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(this.baseURL);
                if (response.status === 401) { // Service is up but requires auth
                    return true;
                }
            } catch (error) {
                console.log(`Waiting for backend service... Attempt ${i + 1}/${maxRetries}`);
                if (i === maxRetries - 1) {
                    throw new Error('Backend service not available. Please ensure the JAR file is running.');
                }
                await new Promise(resolve => setTimeout(resolve, interval));
            }
        }
    }

    async updateBook(id, title, author) {
        try {
            if (!this.context) {
                throw new Error('API not initialized. Call init() first.');
            }

            if (isNaN(id) && id !== undefined) {
                return {
                    status: 400,
                    body: { message: "Invalid | Empty Input Parameters in the Request" }
                };
            }

            const response = await this.context.put(`/api/books/${id}`, {
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
            if (!this.context) {
                throw new Error('API not initialized. Call init() first.');
            }

            const response = await this.context.put(`/api/books/${id}`, {
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
            const noAuthContext = await request.newContext({
                baseURL: CONFIG.baseURL,
                extraHTTPHeaders: {
                    'Content-Type': 'application/json'
                }
            });

            const response = await noAuthContext.put(`/api/books/${id}`, {
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
