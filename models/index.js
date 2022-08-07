//GMS I built the associations here but would like someone else to check and triple check them. I think they are mostly correct but it will be tough to tell until we are actively rendering data on page.
const User = require('./User');
const Catalog = require('./Catalog')
const Book = require('./Book')

//GMS we want to cascade here I believe. if the user deletes their profile, all catalogs and contained books will be deleted as well. 
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

//GMS this one im not sure about. Does book need to belong to both user and catalog? 
Book.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Book, {
    foreignKey: 'user_id'
})

//GMS export our models.
module.exports = { User, Catalog, Book };