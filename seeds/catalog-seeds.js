const Catalog  = require('../models/Catalog');

const catalogData = [
    {
      "name": "My Fav Catalog",
      "genre_type": "fiction",
    }
  ];

  const seedCatalogs = () => Catalog.bulkCreate(catalogData);

  //export our user seed function to be used in mass seeding index
  module.exports = seedCatalogs;