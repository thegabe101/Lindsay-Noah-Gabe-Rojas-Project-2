//index of our api routes. we should have user, book, ctalog, and will use them by those names but pluralized in the api route.

const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const bookRoutes = require('./bookRoutes');
// const catalogRoutes = require('./catalogRoutes');

router.use('/users', userRoutes);
// router.use('/books', bookRoutes);
// router.use('/catalogs', catalogRoutes);

module.exports = router;