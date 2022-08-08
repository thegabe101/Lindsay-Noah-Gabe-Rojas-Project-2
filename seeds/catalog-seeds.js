const Catalog = require('../models/Catalog');

const catalogData = [
  {
    "name": "My Fav Catalog",
    "genre_type": "fiction",
    "user_id": 1,
  },
  {
    "name": "Gabe's Catalog",
    "genre_type": "Sci-Fi",
    "user_id": 1,
  },

];

//GMS same idea as books
const seedCatalogs = () => Catalog.bulkCreate(catalogData);

//GMS export our user seed function to be used in mass seeding index
module.exports = seedCatalogs;