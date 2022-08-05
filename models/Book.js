const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {};

Book.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        isbn_num: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        catalog_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'catalog',
              key: 'id',
            },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
        },
    },
    {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'book',
    }
);

module.exports = Book;