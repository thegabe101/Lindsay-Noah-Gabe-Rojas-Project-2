const { Model, DataTypes } = require('sequelize');
const mySequelize = require('../config/connection');
const sequelize = new Sequelize('database', 'username', 'password');

const ModelComments = require('sequelize-model-comments').init(sequelize, options);

// ModelComments.defineModels({});