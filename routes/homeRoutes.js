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

    Catalog.findAll({
        attributes: [
            'id',
            'name',
            'genre_type',
            'user_id'
        ],
        include: [
            {
                model: Book,
                // attributes: ['id', 'title', 'author', 'isbn_num'],
            },
            {
                model: User,
                attributes: ['username', 'email']
            }
        ],
        where: {
            user_id: req.session.user_id
        }
    })
        .then(catalogData => {
            const catalogs = catalogData.map(catalog => catalog.get({ plain: true }));
            res.render('catalogs', {
                catalog: catalogs,
                user: req.session.user,
                username: req.session.username,
                logged_in: req.session.logged_in
            });
            //GMS some console logs to help me figure out what is going wrong here
            console.log(req.session)
            console.log(req.session.logged_in);
            console.log(req.session.username);
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



router.get('/catalogs/:id', (req, res) => {
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
            const books = bookData.get({ plain: true });
            res.render('singleBooklist', {
                books: books,
                logged_in: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//GMS going to try writing a book rendering route. this is where the API needs to play in but since we don't have front end for that yet its going to be hard to tie it to the fetched obj. 
//GMS going to try different strat- lets just do catalog id containing said books. just need to figure out how to render what they contain. 





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

// route to the about page
router.get("/about", (req, res) => {
    res.render('about', {
        logged_in: req.session.logged_in
    });
});

// route to the contact page
router.get("/contact", (req, res) => {
    res.render('contact', {
        logged_in: req.session.logged_in
    });
});


//GMS want to render a catalog with its displayed books there 
router.get("/singleBooklist", (req, res) => {
    if (req.session.logged_in) {
        res.render('singleBooklist')
    } else if (!req.session.logged_in) {
        throw err
    };
});

module.exports = router;