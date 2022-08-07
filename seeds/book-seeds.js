const Book = require('../models/Book');

const bookData = [
    {
        "title": "The Word for World is Forest",
        "author": "Ursula K. Le Guin",
        "isbn_num": 1,
        "owned": "true"
    }
];

const seedBooks = () => Book.bulkCreate(bookData);

//export our user seed function to be used in mass seeding index
module.exports = seedBooks;