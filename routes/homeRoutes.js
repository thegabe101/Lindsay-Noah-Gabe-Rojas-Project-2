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
            loggedIn: req.session.loggedIn
        })
    })
})

router.get('/home', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    User.findByPk(req.session.user_id, {
        include: [Catalog]
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.loggedIn = true;
        res.render("home", hbsData)
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login', { loggedIn: false });
});

router.get('/signup', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/signup');
        return;
    }

    res.render('home');
});


module.exports = router;