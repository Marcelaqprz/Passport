const router = require('express').Router();
const passport = require('passport');

// path: auth/
const path = require('path');

// GET /login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

//GET /profile
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/profile.html'));
    console.log(req.user);
});

// GET /google/login
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /google/callback
router.get('/google/callback', passport.authenticate('google'), function (req, res) {
    // print req.query.code
    console.log(req.query.code);
    // Successful authentication, redirect to “/”
    res.redirect('/auth/profile');
});

// GET /verifyLogin
router.get('/verifyLogin', (req, res) => {
    if(req.user){
        res.status(200).next();
    }else{
        res.status(401);
    }
});

// GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

// GET /error
router.get('/error', (req, res) => {
    res.send('Error - Something went wrong.');
})

module.exports = router;
