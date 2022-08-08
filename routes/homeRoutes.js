// <<<<<<< HEAD
// <<<<<<< HEAD
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Book, Catalog } = require('../models/User');
// =======
//FRONTEND ROUTES
// =======
//GMS FRONTEND ROUTES
// >>>>>>> dev

const Router = require('express').Router();
// const sequelize = require('../config/connection');
const { User } = require('../models');
const { Book } = require('../models');
const { Catalog } = require('../models');

//GMS front end routes to the login and home pages. 

router.get("/", (req, res) => {
    Catalog.findAll({
        include: [User]
    }).then(data => {
        const hbsData = data.map(cata => cata.toJSON())
        res.render("home", {
            catalogs: hbsData,
            logged_in: req.session.logged_in
        })
    })
})


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
// >>>>>>> dev

//GMS FRONT END to login path
router.get('/login', (req, res) => {
    //GMS if logged_in is checked as true they are redirected to home. if it is false we render the login page
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
    }

// <<<<<<< HEAD
// <<<<<<< HEAD
    res.render('login');
});

router.get('/home', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }

    res.render('home');
});

module.exports = router; 
// =======
    res.render('login', { loggedIn: false });
// =======
    res.render('login', { logged_in: false });
// >>>>>>> dev


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
router.get('/catalogs', (req, res) => {
    res.render('catalogs')
});



module.exports = router;
// >>>>>>> dev
