//ALL ROUTES WORKING! NO TOUCHY ASK GABE

const router = require('express').Router();
const { User } = require("../../models");
const { Catalog } = require("../../models");
const { Book } = require("../../models");
const haveAuth = require('../../utils/auth');
// const bcrypt = require('bcrypt');

//route to get ALL users, without password attribute if we just want other user data
// /api/users
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
//route to get a single user by id 
// api/users/:id
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
                //not sure whether we need an alias here or not
                // as: 'catalog_books'
            }
        ]
    })
        .then(userData => {
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

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            console.log(userData.id);
            console.log(req.session.logged_in);
            res.json({ user: userData, message: 'User successfully logged in.' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


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

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);


        req.session.save(() => {
            req.session.user_id = newUser.id,
                req.session.email = newUser.email,
                req.session.username = newUser.username,
                req.session.password = newUser.password,
                req.session.logged_in = true;

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


//             //can console log passwords here to check debugging

//             //compare password to hashed password; if not matching, return error.


//             //if matching, save session data.
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

router.post('/logout', (req, res) => {
    console.log("logout attempt!", req.body.user_id)
    console.log(req.session.logged_in)
    if (req.session.logged_in) {
        //logging out is simple- all we need to do is destroy the req.session. can send a 404 if something fails 
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


router.put('/:id', haveAuth, (req, res) => {
    // expects {name: 'Gabe', username: 'thegabe101', email: 'sowag@gmail.com', password: 'password123'}
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

//deleting a user will involve a similar process to logout except we require an authorization, which we will grab from our util folder
router.delete('/:id', haveAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user matching that id was found in our database.' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//exporting router at end should do trick for retrieving route in user data creation
module.exports = router;
