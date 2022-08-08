//GMS require exported functions
const seedUsers = require('./user-seeds');
const seedBooks = require('./book-seeds');
const seedCatalogs = require('./catalog-seeds');

//GMS require sequelize for seeding sql tables
const sequelize = require('../config/connection');

//GMS call seeddatabase which will be catch function for each seed
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n------------------------- SUCESSFULLY SYNCED -----------------------\n');

    await seedUsers();
    console.log('\n----------------------- USERS SUCCESSFULLY SEEDED ----------------------\n');

    await seedCatalogs();
    console.log('\n-------------------- CATALOGS SUCCESSFULLY SEEDED -------------------\n');

    await seedBooks();
    console.log('\n---------------------- BOOKS SUCCESSFULLY SEEDED ------------------------\n');


    process.exit(0);
};

seedDatabase();