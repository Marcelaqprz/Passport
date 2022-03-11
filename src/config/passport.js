const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const CLIENT_ID = '';
const CLIENT_SECRET = '';

passport.use(new GoogleStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('Usuario: ', profile);
        // lookup user using User class
        // if not exist, save it using User and call done(null, createdUser)
        // if it does exist call done(null, user)

        //ALMACENAR USUARIOS DISTINTOS
        const fuser = User.find(profile.id);
        if(fuser){
            done(null, profile);
        }else{
            const user = User.create({googleId: profile.id, email: profile.emails, imageUrl: profile.photos}).then(user=> done(null,user));
        }
        
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.find(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});