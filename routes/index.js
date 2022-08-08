//GMS our index of routes should include our home routes which are basically just front end rendering + our api routes, which will provide the logic for backend crud functionality

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use(homeRoutes)

//GMS not sure whether we need this router end or not in index. leaving it here for now
// router.use((req, req) => {
//     res.status(404).end();
// })

module.exports = router;