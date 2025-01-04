const Authentication = require('../../Authentication/Authentication');
const CONFIG = require('../../utils/config');

class BookAPI {
    constructor(auth = new Authentication(), config = CONFIG) {
        this.auth = auth;
        this.baseURL = `${config.baseURL}/api/books`;
        this.context = null;
    }

    // Initialization method with hardcoded username and password
    async init() {
        try {
            await this.waitForBackendService();
            
            // Hardcoded credentials
            const username = 'user';
            const password = 'password';
            
            this.context = await this.auth.init(username, password);
            return this;
        } catch (error) {
            throw new Error(`Failed to initialize BookAPI: ${error.message}`);
        }
    }

    // Wait for backend service to become available
    async waitForBackendService(maxRetries = 5, interval = 2000) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(this.baseURL);
                if (response.status === 401 || response.ok) { // Service is up
                    return true;
                }
            } catch (error) {
                console.warn(`Waiting for backend service... Attempt ${i + 1}/${maxRetries}`);
                if (i === maxRetries - 1) {
                    throw new Error('Backend service not available. Ensure the JAR file is running.');
                }
                await new Promise(resolve => setTimeout(resolve, interval));
            }
        }
    }

    // Validate the book ID
    validateBookId(id) {
        if (!id || typeof id !== 'number' || id < 0) {
            throw new Error('Invalid or empty input parameters in the request');
        }
    }

    // Get book by ID
    async getBookById(id) {
        try {
            this.validateBookId(id);
            if (!this.context) {
                throw new Error('Authentication required to access this resource.');
            }

            const response = await this.context.get(`${this.baseURL}/${id}`);
            return {
                status: response.status(),
                body: await response.json().catch(() => ({}))
            };
        } catch (error) {
            console.error('Error getting book:', error);
            const status = error.message.includes('Invalid') ? 400 : error.message.includes('Authentication') ? 401 : 500;
            return {
                status,
                body: { message: error.message }
            };
        }
    }
}

module.exports = BookAPI;
