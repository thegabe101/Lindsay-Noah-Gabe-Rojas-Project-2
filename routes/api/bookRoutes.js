const router = require('express').Router();
const { Book, Catalog, User } = require("../../models");
const haveAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('------route hit-------');
    Book.findAll({
        attributes: [
            'id',
            'title',
            'author',
            'isbn_num',
            'owned',
        ],
        include: [
            {
                model: Catalog,
                attributes: ['id', 'name', 'genre_type'],
                include: {
                    model: User,
                    attributes: ['username', 'email']
                }
            },
            {
                model: User,
                attributes: ['username', 'email']
            },
        ]
    })
        .then(bookData => res.json(bookData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


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