//GMS boilerplate for server.
//GMS we do need to make sure out dotenv files are correct. working in a group this will be a slightly more tenuous process than it is alone
const Sequelize = require('sequelize');
require('dotenv').config();

//GMS sequelize at first undeclared
let sequelize;


//GMS if our environment is JAWS declare sequelize there, if not use local host and our .env to check in
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

//GMS export whichever sequelize we end up using 
module.exports = sequelize;
