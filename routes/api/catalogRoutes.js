const router = require('express').Router();
const { User } = require("../../models");
const { Catalog } = require("../../models");
const { Book } = require("../../models");

router.get('/', (req, res) => {
    //GMS not sure yet how were going to do this. first going to see if i can retrieve catalogs before worrying about which user they belong to. 
    //GMS this will require some clarification of our SQL side.
    Catalog.findAll({
    })
        .then(catData => res.json(catData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    //GMS going to try creating new route for the post function i am working with on js pub. we are currently able to retrieve but not post new cats
    //GMS we might need to run some sort of logged in check prior to this post but can put that on backburner. this would be to ensure that a new cat posted is only by that user
    Catalog.create({

        name: req.body.name,
        genre_type: req.body.genre_type,

    }).then
        // console.log("am i doing this right??")
        (catData => res.json(catData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;