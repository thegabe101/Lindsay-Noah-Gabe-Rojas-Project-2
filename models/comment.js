const Sequelize = require('sequelize');
// const mySequelize = require('../config/connection');
const sequelize = new Sequelize('database', 'username', 'password');

const ModelComments = require('sequelize-model-comments').init(sequelize, options || {});
ModelComments.defineModels();

const Post = sequelize.define('Post', {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
});

Post.enableModelComments();

const options = {
    /* ... */
    userModel: 'users',
};

// Post.update({
//     /* ... */
//     comment: 'This attribute will be used to create a comment which annotates the revision'
// }, {
//     userId: user.id
// }).then(() {
//     /* ... */
// });