const express = require('express');
const router = express.Router();
const {User, Booklist} = require('../models');


//TODO: create a get route for all possible booklists 

//test get route for a single booklist
router.get("/booklist/:id", (req,res) => {
    Booklist.findByPk(req.params.id).then(bookListData=> {
        const hbsData = bookListData.toJSON();
        res.render('singleBookList', hbsData);
    });
});

router.get("login")