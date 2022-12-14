const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Catalog extends Model { };

Catalog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        //GMS include timestamps to sort by asc/desc order
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'catalog',
    }
);

module.exports = Catalog;
