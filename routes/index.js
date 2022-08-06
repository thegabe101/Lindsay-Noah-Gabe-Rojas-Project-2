const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use(homeRoutes)

//not sure whether we need this router end or not in index. leaving it here for now
// router.use((req, req) => {
//     res.status(404).end();
// })

module.exports = router;