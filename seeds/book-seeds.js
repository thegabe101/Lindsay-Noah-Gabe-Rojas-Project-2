const Book = require('../models/Book');

//GMS test book seed
const bookData = [
    {
        "title": "The Word for World is Forest",
        "author": "Ursula K. Le Guin",
        "isbn_num": 1,
        "owned": "true"
    }
];

//GMS will bulk create our data in the exported function when we seed database
const seedBooks = () => Book.bulkCreate(bookData);

//export our user seed function to be used in mass seeding index
module.exports = seedBooks;