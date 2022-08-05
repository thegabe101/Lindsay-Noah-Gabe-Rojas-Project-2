const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const Book = sequelize.define(
    'Book',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorName: {
            type: DataTypes.STRING
        },
    }
);

console.log(Book === sequelize.models.Book);

module.exports = Book;