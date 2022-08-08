const router = require('express').Router();
const { Book } = require("../../models");
const haveAuth = require('../../utils/auth');


router.post('/', haveAuth, (req, res) => {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn_num: req.body.isbn_num,
        owned: req.body.owned,
        catalog_id: req.session.catalog_id,
        user_id: req.session.user_id
    }).then
        (catData => res.json(catData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;