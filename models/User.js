const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//GMS bcrypt compare sync method
class User extends Model {
    checkPassword(userPw) {
        return bcrypt.compareSync(userPw, this.password)
    };
};

User.init(
    {
        //GMS our primary id, which we will autoincrement
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        //GMS eliminating name because it is overcomplicating things. this can be added later if we want
        // name: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        //GMS a length of pw between 8 and 20 should be suitable 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 20]
            },
        },
        
    },
    {
        //this is where we hash our password, salt level 10
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;