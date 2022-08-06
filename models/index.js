const User = require('./User');
const Catalog = require('./Catalog')
const Book = require('./Book')

User.hasMany(Catalog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Catalog.belongsTo(User, {
    foreignKey: 'user_id'
});

Catalog.hasMany(Book, {
    foreignKey: 'user_id'
})

Book.belongsTo(Catalog, {
    foreignKey: 'user_id'
})

Book.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Book, {
    foreignKey: 'user_id'
})

module.exports = { User, Catalog, Book };