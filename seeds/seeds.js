const seedUsers = require('./user-seeds');
// const seedBooks = require('./book-seeds');
const seedCatalogs = require('./catalog-seeds');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n------------------------- SUCESSFULLY SYNCED -----------------------\n');

    await seedUsers();
    console.log('\n----------------------- USERS SUCCESSFULLY SEEDED ----------------------\n');

    // await seedBooks();
    // console.log('\n---------------------- BOOKS SUCCESSFULLY SEEDED ------------------------\n');

    await seedCatalogs();
    console.log('\n-------------------- CATALOGS SUCCESSFULLY SEEDED -------------------\n');

    process.exit(0);
};

seedDatabase();