//FRONTEND ROUTES

const router = require('express').Router();
// const sequelize = require('../config/connection');
const { User } = require('../models');
const { Book } = require('../models');
const { Catalog } = require('../models');

//front end routes to the login and home pages. 

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

//login path
router.get('/login', (req, res) => {
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

router.get('/catalogs', (req, res) => {
    res.render('catalogs')
});



module.exports = router;