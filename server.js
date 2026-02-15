const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initial sample data (aligned with README requirements)
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
    { id: 3, title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian Fiction" }
];

// 1. GET /api/books - Get all books
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// 2. GET /api/books/:id - Get a specific book
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
});

// 3. POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year, genre } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and Author are required' });
    }

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        year: year || null,
        genre: genre || "Unknown"
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. PUT /api/books/:id - Update a book
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.year = req.body.year || book.year;
    book.genre = req.body.genre || book.genre;

    res.status(200).json(book);
});

// 5. DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    const deletedBook = books.splice(bookIndex, 1);
    res.status(200).json(deletedBook[0]);
});

// Conditional listener for testing
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
