const router = require('express').Router();
const { User } = require("../../models");
const { Catalog } = require("../../models");
const { Book } = require("../../models");
const haveAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('CAT------route hit-------CAT');
    Catalog.findAll({
        // attributes: [
        //     'id',
        //     'name',
        //     'genre_type'
        // ],
        // order: [['created_at', 'DESC']],
        include: [
            //GMS we will attach user to book after including the book model that is possessed by the catalogs
            {
                model: Book,
                //GMS check on sequelize docs regarding inclusion of attributes or not- seems extraneous
                // attributes: ['id', 'title', 'author', 'isbn_num', 'owned'],
                // include: {
                //     model: User,
                //     attributes: ['username', 'email']
                // }
            },
            {
                model: User,
                // attributes: ['id', 'username', 'email']
            },
        ]
    })
        .then(catPostData => res.json(catPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    console.log(req.session);
    Catalog.findByPk(req.params.id, {

        include: [
            {
                model: Book,
            },
            //GMS !! THINK ABOUT RELATIONSHIPS!
            // {
            //     model: User,
            //     attributes: ['username', 'email']
            // }
        ]
    })
        .then(bookData => {
            res.status(200).json(bookData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});




// router.get('/', (req, res) => {
//     //GMS not sure yet how were going to do this. first going to see if i can retrieve catalogs before worrying about which user they belong to. 
//     //GMS this will require some clarification of our SQL side.
//     Catalog.findAll({
//     })
//         .then(catData => res.json(catData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.post('/', haveAuth, (req, res) => {
    //GMS going to try creating new route for the post function i am working with on js pub. we are currently able to retrieve but not post new cats
    //GMS we might need to run some sort of logged in check prior to this post but can put that on backburner. this would be to ensure that a new cat posted is only by that user
    Catalog.create({

        name: req.body.name,
        genre_type: req.body.genre_type,
        user_id: req.session.user_id

    }).then
        // console.log("am i doing this right??")
        (catData => res.json(catData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;