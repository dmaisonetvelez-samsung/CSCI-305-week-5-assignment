const request = require('supertest');
const app = require('../server'); // Points up one level to the root server.js

describe('Books API Endpoints', () => {
    
    it('should GET all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0]).toHaveProperty('year'); // Check for the year property
    });

    it('should POST a new book', async () => {
        const newBook = {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            year: 1937,
            genre: "Fantasy"
        };
        const res = await request(app).post('/api/books').send(newBook);
        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual("The Hobbit");
    });

    it('should return 404 for a non-existent book', async () => {
        const res = await request(app).get('/api/books/999');
        expect(res.statusCode).toEqual(404);
    });
});
