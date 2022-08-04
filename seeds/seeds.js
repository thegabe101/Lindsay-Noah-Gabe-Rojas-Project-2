const sequelize = require('../config/connection');
const { User, Catalogue, Book } = require('../models');

const userData = require('./userData.json');
const catalogueData = require('./projectData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();