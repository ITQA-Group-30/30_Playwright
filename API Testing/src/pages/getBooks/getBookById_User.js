const Authentication = require('../../Authentication/Authentication');
const CONFIG = require('../../utils/config');

class BookAPI {
    constructor() {
        this.auth = new Authentication();
        this.baseURL = CONFIG.baseURL;
        this.context = null;
    }

    async init(username, password) {
        try {
            await this.waitForBackendService();
            this.context = await this.auth.init(username, password);
            return this;
        } catch (error) {
            throw new Error(`Failed to initialize BookAPI: ${error.message}`);
        }
    }

    async waitForBackendService(maxRetries = 5, interval = 2000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(`${this.baseURL}/api/books`);
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

    async getBookById(id) {
        try {
            // Check for negative ID
            if (id < 0) {
                return {
                    status: 404,
                    body: { message: "Invalid | Empty Input Parameters in the Request" }
                };
            }

            const response = await this.context.get(`${this.baseURL}/api/books/${id}`);

            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error getting book:', error);
            return {
                status: 500,
                body: { message: error.message }
            };
        }
    }
}

module.exports = BookAPI;