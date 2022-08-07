const User = require('../models/User');

const userData = [
  {
    // "name": "Gabe",
    "username": "thegabe101",
    "email": "sowa332@gmail.com",
    "password": "password"
  }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

//export our user seed function to be used in mass seeding index
module.exports = seedUsers;