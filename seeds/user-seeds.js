const { User } = require('../models/User');

const userData = [
    {
      "name": "Gabe",
      "username": "thegabe101",
      "email": "sowa332@gmail.com",
      "password": "password"
    }
  ];

  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;