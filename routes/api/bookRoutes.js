const router = require('express').Router();
const { Book, Catalog, User } = require("../../models");
const haveAuth = require('../../utils/auth');

//api/books
router.get('/', (req, res) => {
    console.log('SHOW ALL BOOKS ROUTE HIT');
    console.log('------route hit-------');
    Book.findAll({
        //GMS no need to limit data 
        // attributes: [
        //     'id',
        //     'title',
        //     'author',
        //     'isbn_num',
        // ],
        include: [
            {
                model: Catalog,
                // attributes: ['id', 'name', 'genre_type'],
                include: {
                    model: User,
                    // attributes: ['username', 'email']
                }
            },
            //GMS we decided book doesnt need to belong to user so this relationship no longer exists
            // {
            //     model: User,
            //     attributes: ['username', 'email']
            // },
        ]
    })
        .then(bookData => res.json(bookData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Book.findByPk(req.params.id, {

    }).then(oneBook => res.json(oneBook))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GMS when pressing front end + button, a pop up model comes in asking which catalog we'd like to add to 
router.post('/:id', haveAuth, (req, res) => {
    Book.create({

        where: {
            id: req.params.id,
        },

        title: req.body.title,
        author: req.body.author,
        isbn_num: req.body.isbn_num,
        catalog_id: req.body.id,

    }).then
        (catData => res.json(catData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;