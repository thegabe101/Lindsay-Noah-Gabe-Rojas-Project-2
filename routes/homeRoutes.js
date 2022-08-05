const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Book, Catalog } = require('../models/User');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }

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