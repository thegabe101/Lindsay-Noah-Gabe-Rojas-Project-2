const User = require('./User');
const Catalog = require('./Catalog')

User.hasMany(Catalog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Catalog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Catalog };