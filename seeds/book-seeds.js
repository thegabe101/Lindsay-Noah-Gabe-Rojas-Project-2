import Book from '../models/Book';

const bookData = [
    {
        "Title": "The Word for World is Forest",
        "Author": "Ursula K. Le Guin",
        "isbn_num": "9780575023024",
        "owned": "true"
    }
];

const seedBooks = () => Books.bulkCreate(bookData);

//export our user seed function to be used in mass seeding index
export default seedBooks;