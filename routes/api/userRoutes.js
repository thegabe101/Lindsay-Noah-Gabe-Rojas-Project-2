//ALL ROUTES WORKING! NO TOUCHY ASK GABE

const router = require('express').Router();
const { User } = require("../../models");
const { Catalog } = require("../../models");
const { Book } = require("../../models");
const haveAuth = require('../../utils/auth');
// const bcrypt = require('bcrypt');

//GMS route to get ALL users, without password attribute if we just want other user data
// route = /api/users

router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GMS route to get a single user by id- we also want to grab their catalog and book data while were at it
// route = api/users/:id

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Catalog,
                attributes: ['id', 'name', 'genre_type']
            },
            {
                model: Book,
                attributes: ['title', 'author', 'isbn_num', 'owned'],
                // through: Catalog,
                //GMS not sure whether we need an alias here or not
                // as: 'catalog_books'
            }
        ]
    })
        .then(userData => {
            //GMS if no user data is returned by id
            if (!userData) {
                res.status(404).json({ message: 'No user matching this id could be found within our database.' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//GMS this was a model route for signup in try form. i found a way to get it working without
// router.post("/signup", async (req, res) => {
//     try {
//         const newUser = await User.create({
//             username: req.body.username,
//             email: req.user.email,
//             password: req.body.password,
//             individualHooks: true
//         })

//         console.log(newUser);
//         req.session.user = {
//             id: newUser.id,
//             username: newUser.username,
//             email: newUser.email
//         }

//         return res.redirect("home")
//     } catch (err) {

//         res.status(500).json({ msg: "server error", err })

//     }
// });

//GMS FRONT END ROUTE is /login. this backend route is not relevant for any modeling on live server
router.post('/login', async (req, res) => {
    try {
        //GMS I don't believe there is a need to make this an async/await function here, but after having trouble with other login routes this one seems to be working. 
        const existingUserData = await User.findOne({ where: { email: req.body.email } });
        //GMS if no found user exists where the params match the existing id database, inform front end user that something is not matching. Not sure how we could tell them WHICH is not matching
        if (!existingUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        //GMS because the existing userdata has been fetched and that includes password, we can form a variable for that req.body.password data and check to see whether it is attached or not
        const validPassword = await existingUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        //GMS once we log in we certainly want to save some properties to session. we can simply attach the existing user data id, then we record a boolean of true that this id is logged in
        req.session.save(() => {
            req.session.user_id = existingUserData.id;
            req.session.logged_in = true;
            console.log(existingUserData.id);
            console.log(req.session.logged_in);
            res.json({ user: existingUserData, message: 'User successfully logged in.' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


//!!! Please ignore. Want to leave broken routes in for studying purposes so I can look back later to see what I was thinking/where I went wrong. 

// router.post("/login", async (req, res) => {
//     if (req.session.user) {
//         return res.redirect("home")
//     }
//     const retrievedUser = await User.findOne({
//         where: {
//             email: req.body.email
//         }
//     }
//     )
//     if (!retrievedUser) {
//         return res.status(401).json({ msg: "no matching user in database" })
//     } else if (!bcrypt.compareSync(req.body.password, retrievedUser.password)) {
//         res.status(400).json({ message: 'Sorry, that password is incorrect. Please try again.' });
//         return;
//     } else {
//         console.log("user is logged in")
//         req.session.save(() => {
//             res.json({ user: retrievedUser, msg: "logged in successfully" })
//         })
//     }
// })

// router.post('/signup', (req, res) => {
//     // this will expect input in this format: {name: 'Gabe', username: 'thegabe101', email: 'sowag@gmail.com', password: 'password123'}
//     const newUser = User.create({
//         // name: req.body.name,
//         // username: req.body.username,
//         // email: req.body.email,
//         // password: req.body.password,
//         // individualHooks: true,

//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         individualHooks: true

//     })
//     console.log(newUser);
//     req.session.user = {
//         id: newUser.id,
//         username: newUser.username,
//         email: newUser.email
//     }
//         .then(userData => {
//             req.session.user.save(() => {
//                 // req.session.user_id = userData.id;
//                 // req.session.username = userData.username;
//                 // //log session as boolean true- logged in
//                 // //will refer to this as our session token 
//                 // req.session.loggedIn = true;

//                 res.json(userData);
//             });
//         }).catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// });

//GMS BACKEND ROUTE IS /api/users/signup
router.post('/signup', async (req, res) => {
    try {
        //GMS declare a new user variable and wait for the body response, which will include all attributes of the user model
        //GMS signup logic data being record in the public script
        const newUser = await User.create(req.body);

        //GMS this is where we save the session data for a new user. By creating a variable possessing the entire body of the user, we can simplify our code a bit and just take those attributes from said user in setting the session
        req.session.save(() => {
            req.session.user_id = newUser.id,
                req.session.email = newUser.email,
                req.session.username = newUser.username,
                req.session.password = newUser.password,
                req.session.logged_in = true;

            //GMS respond status 200 with the new user data, as well as set the session. front end route will direct us to the homepage afterwards
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//ROUTE IS: api/users/login
// router.post('/login', (req, res) => {
//     console.log("login attempt!", req.body)
//     // this will expect input in this format: {email: 'sowag@gmail.com', password: 'password123'}
//     User.findOne({
//         //finds one user where an email is matching, and if not it returns with a status showing no email address
//         where: {
//             email: req.body.email
//         }
//     }).then(userData => {
//         if (!userData) {
//             res.status(400).json({ message: 'No user with that email address exists in our database.' });
//             return;
//         } else if (!bcrypt.compareSync(req.body.password, userData.password)) {
//             res.status(400).json({ message: 'Sorry, that password is incorrect. Please try again.' });
//             return;
//         }
//         else {
//             console.log("User is logged in.")


//             //GMS can console log passwords here to check debugging

//             //GMS compare password to hashed password; if not matching, return error.


//             //GMS if matching, save session data.
//             req.session.save(() => {
//                 // this is where we save the session variables. all we should need to fetch everything else user-based is user id, username, and the logged in token. 
//                 req.session.user_id = userData.id;
//                 req.session.username = userData.username;
//                 req.session.loggedIn = true;
//                 console.log(userData.id);
//                 console.log(userData.username);
//                 console.log(req.session);

//                 res.json({ user: userData, message: 'Logged in successfully.' });
//             });
//         };
//     });
// });

//GMS no need for a front end route here; login banner will simply route directly to our session destroy 
router.post('/logout', (req, res) => {
    //GMS lets check to make sure we have these credentials before we log a ghost out
    console.log("logout attempt!", req.body.user_id)
    console.log(req.session.logged_in)
    if (req.session.logged_in) {
        //GMS logging out is simple- all we need to do is destroy the req.session. can send a 404 if something fails 
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// router.post('/logout', (req, res) => {
//     console.log("logout attempt!", req.body)
//     // console.log(req.session.loggedIn)
//     if (req.session.user) {
//         //logging out is simple- all we need to do is destroy the req.session. can send a 404 if something fails 
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     }
//     else {
//         res.status(404).end();
//     }
// });



//TODO: GMS Develop front end for put route to make sure it is functional
router.put('/:id', haveAuth, (req, res) => {
    //GMS expects {name: 'Gabe', username: 'thegabe101', email: 'sowag@gmail.com', password: 'password123'}
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GMS deleting a user will involve a similar process to logout except we require an authorization, which we will grab from our util folder
router.delete('/:id', haveAuth, (req, res) => {
    //GMS where the id matches the requested parameters
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        //GMS if we dont return anything, we note the error 
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user matching that id was found in our database.' });
                return;
            }
            //GMS if we do, we destroy userData matching a user with that id parameter
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//GMS exporting router at end should do trick for retrieving route in user data creation
module.exports = router;
