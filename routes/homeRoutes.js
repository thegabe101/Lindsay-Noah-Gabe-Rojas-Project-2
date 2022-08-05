//FRONTEND ROUTES

const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Book, Catalog } = require('../models/User');

//front end routes to the login and home pages. 

router.get('/login', (req, res) => {
    if (req.session.user_id) {
        res.redirect('/home');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    }

    res.render('signup');
});

router.get('/home', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }

    res.render('home');
});

module.exports = router;