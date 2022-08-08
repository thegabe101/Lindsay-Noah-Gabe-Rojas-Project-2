//GMS FRONTEND ROUTES

const router = require('express').Router();
// const sequelize = require('../config/connection');
const { User } = require('../models');
const { Book } = require('../models');
const { Catalog } = require('../models');

//GMS front end routes to the login and home pages. 

//GMS going to need to rework this route to include user and book models in the data. I think we will need to flip the plain to on and use a map in order to retrieve and render all posts. 

// router.get("/", (req, res) => {
//     Catalog.findAll({
//         include: [User]
//     }).then(data => {
//         const hbsData = data.map(cata => cata.toJSON())
//         res.render("home", {
//             catalogs: hbsData,
//             logged_in: req.session.logged_in
//         })
//     })
// })

router.get('/catalogs', (req, res) => {
    console.log(req.session);

    User.findOne({where: {
        id: req.session.user_id,
    },
    raw:true,
    include: [Catalog]
    },
        // attributes: [
        //     'id',
        //     'username',
        //     'email'
        // ],
        // include: [
            // {
            //     model: Book,
            //     attributes: ['id', 'title', 'author', 'isbn_num', 'owned'],
            //     include: {
            //         model: User,
            //         attributes: ['username', 'email']
            //     }
            // },


                // include:{
                //     model: Catalog,
                //     attributes: ['id', 'name', 'genre_type', 'user_id']
                // }
            
        // ]
    )
        .then(catalogData => {
            console.log(catalogData)
            const catalogs = catalogData.map(catalog => catalog.get({ plain: true }));
            res.render('catalogs', {
                catalog: catalogs,
                logged_in: req.session.logged_in
            });
            //GMS some console logs to help me figure out what is going wrong here
            console.log(req.session)
            console.log(req.session.logged_in);
            console.log('THESE IS CATALOGZ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log({ catalog: catalogs });
            console.log(req.session.user_id);
            console.log(catalogs[0])
            // console.log(req.body.username)
            // console.log(catalogs.username)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



router.get('/books', (req, res) => {
    console.log(req.session);

    Book.findAll({
        attributes: [
            'id',
            'author',
            'title',
            'isbn_num'
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
            }
        ]
    })
        .then(bookData => {
            const books = bookData.map(book => book.get({ plain: true }));
            res.render('singleBooklist', {
                book: books[0],
                logged_in: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





//GMS when developed will render homepage and user catalogs 
router.get('/home', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    }
    User.findByPk(req.session.user_id, {
        include: [Catalog]
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in = true;
        res.render("home", hbsData)
    })
});

//GMS FRONT END to login path
router.get('/login', (req, res) => {
    //GMS if logged_in is checked as true they are redirected to home. if it is false we render the login page
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
    }

    res.render('login', { logged_in: false });
});

// router.get('/login', async (req, res) => res.render('login'));

// signup path
// router.get('/signup', (req, res) => {
//     if (!req.session.user_id) {
//         res.redirect('/signup');
//         return;
//     }

//     res.render('signup');
// });


//GMS will just make signup route straightforward since it is really only accessible from one place
router.get('/signup', (req, res) => {
    res.render('signup');
});

// router.get("/catalogs", (req, res) => {
//     Catalog.findByPk(req.params.id).then(catDat => {
//         const hbsData = catDat.toJSON();
//         hbsData.logged_in = req.session.logged_in
//         res.render("catalogs", hbsData)
//     })
// })

//GMS front end test route for catalogs currently being grabbed by the my catalogs in shelves
// router.get('/catalogs', (req, res) => {
//     res.render('catalogs', req.session.user)
// });

// router.get("/catalogs", (req, res) => {
//     if (!req.session.user) {
//         res.redirect("/login")
//     }
//     res.render("catalogs", req.session.user)
// })



module.exports = router;