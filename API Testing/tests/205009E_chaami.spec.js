const { test } = require('@playwright/test');

let token;

test.beforeAll(async ({ request }) => {
    const response = await request.post('http://localhost:7081/api/login', {
        data: {
            "username": "admin",
            "password": "password"
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok()) {
        try {
            const responseBody = await response.json();
            if (responseBody && responseBody.token) {
                token = responseBody.token; // Adjust key name based on API response
                console.log(`Token obtained: ${token}`);
            } else {
                console.error('Token not found in response body:', responseBody);
            }
        } catch (error) {
            console.error('Error parsing JSON response:', error);
        }
    } else {
        console.error(`Login API failed with status ${response.status()}: ${await response.text()}`);
    }
});

test('create a book', async ({ request }) => {
    if (!token) {
        console.error('No token available. Skipping test.');
        return;
    }

    const response = await request.post('http://localhost:7081/api/books', {
        data: {
            "title": "Book2",
            "author": "Chaami"
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Use the obtained token
        }
    });

    console.log(`Status: ${response.status()}`);
    if (response.ok()) {
        try {
            const responseBody = await response.json();
            console.log(`Response:`, responseBody);
        } catch (error) {
            console.error('Error parsing JSON response:', error);
        }
    } else {
        console.error(`Create book API failed with status ${response.status()}: ${await response.text()}`);
    }
});
