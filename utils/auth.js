//GMS potential auth export for put variable. not sure if we'll use it yet

const haveAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = haveAuth;