//GMS this model will be the trickiest. marked down as to do
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//GMS require sequelize to data/tableize our model

class Book extends Model { };

//GMS initiate book with several attributes for now, but im not sure which will stick.
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
        //GMS think we need to add an owned field here as a boolean. this will be a simple way for a user to declare whether it is in the collection or not without checking more complex parameters.
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