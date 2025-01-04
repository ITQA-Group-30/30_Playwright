const CONFIG = require('../../utils/config');
const Authentication = require('../../Authentication/Authentication');

class BookAPI {
    constructor() {
        this.context = null;
        this.baseURL = `${CONFIG.baseURL}/api/books`;
        this.auth = new Authentication(); // Instantiate the Authentication class
    }

    async init() {
        try {
            // Initialize the authentication context
            this.context = await this.auth.init(CONFIG.username, CONFIG.password);
        } catch (error) {
            console.error('Error initializing BookAPI:', error);
            throw new Error('Failed to initialize BookAPI');
        }
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
