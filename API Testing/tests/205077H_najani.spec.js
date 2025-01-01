const { test, expect, request } = require('@playwright/test');

// Base URL of the application
const BASE_URL = 'http://localhost:7081';

test.describe('API Testing for Book Management System', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        // Add Basic Authentication if required
        Authorization: `Basic ${Buffer.from('admin:password').toString('base64')}`,
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // GET: Retrieve all books
  test('GET /api/books - Retrieve all books', async () => {
    const response = await apiContext.get('/api/books');
    expect(response.status()).toBe(200);
    const books = await response.json();
    console.log('Books:', books);
    expect(Array.isArray(books)).toBeTruthy();
  });

  // GET: Retrieve a specific book by ID
  test('GET /api/books/{id} - Retrieve book by ID', async () => {
    const response = await apiContext.get('/api/books/1'); // Replace '1' with an actual ID
    if (response.status() === 200) {
      const book = await response.json();
      console.log('Book Details:', book);
      expect(book).toHaveProperty('id', 1);
    } else {
      expect(response.status()).toBe(404);
    }
  });

  // POST: Create a new book
  test('POST /api/books - Create a new book', async () => {
    const payload = {
      title: 'New Book Title 5',
      author: 'New Book Author 5',
    };
    const response = await apiContext.post('/api/books', { data: payload });
    expect(response.status()).toBe(201);
    const newBook = await response.json();
    console.log('Created Book:', newBook);
    expect(newBook).toHaveProperty('title', payload.title);
    expect(newBook).toHaveProperty('author', payload.author);
  });

  // PUT: Update an existing book
  test('PUT /api/books/{id} - Update a book', async () => {
    const payload = {
      id: 1, // Replace '1' with an actual ID
      title: 'Updated Book Title 5',
      author: 'Updated Book Author 5',
    };
    const response = await apiContext.put(`/api/books/${payload.id}`, { data: payload });
    if (response.status() === 200) {
      const updatedBook = await response.json();
      console.log('Updated Book:', updatedBook);
      expect(updatedBook).toHaveProperty('title', payload.title);
      expect(updatedBook).toHaveProperty('author', payload.author);
    } else {
      expect(response.status()).toBe(404);
    }
  });

  // DELETE: Delete a book by ID
  test('DELETE /api/books/{id} - Delete a book', async () => {
    const bookId = 7; // Replace '1' with an actual ID
    const response = await apiContext.delete(`/api/books/${bookId}`);
    if (response.status() === 200) {
      console.log(`Book with ID ${bookId} deleted successfully.`);
    } else {
      expect(response.status()).toBe(403);
    }
  });
});
