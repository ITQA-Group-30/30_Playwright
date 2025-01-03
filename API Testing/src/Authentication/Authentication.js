const { request } = require('@playwright/test');
const CONFIG = require('../../src/utils/config');

class Authentication {
    constructor() {
        this.context = null;
        this.baseURL = CONFIG.baseURL;
    }

    async init(username = CONFIG.defaultAdmin.username, password = CONFIG.defaultAdmin.password) {
        try {
            this.context = await request.newContext({
                baseURL: this.baseURL,
                extraHTTPHeaders: {
                    'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                }
            });

            // Test the connection
            const testResponse = await this.context.get('/api/books');
            if (testResponse.status() === 401) {
                throw new Error('Authentication failed');
            }

            return this.context;
        } catch (error) {
            console.error('Error initializing API:', error);
            throw new Error(`Failed to initialize API connection: ${error.message}`);
        }
    }

    getContext() {
        if (!this.context) {
            throw new Error('Authentication context not initialized. Call init() first.');
        }
        return this.context;
    }
}

module.exports = Authentication;
