//GMS index of our api routes. we should have user, book, catalog, and will use them by those names but pluralized in the api route.

//GMS dont forget to uncomment the necessary router use when you form the other routes reminder
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const catalogRoutes = require('./catalogRoutes');


//GMS declaring users for user and catalogs for catalogs. not sure how books are going to work yet.
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/catalogs', catalogRoutes);

module.exports = router;