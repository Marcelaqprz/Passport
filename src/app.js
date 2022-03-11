const express = require('express');
const path = require('path');
const routes = require('./routes/auth.route');

require('dotenv').config();
require('./config/passport');

const app = express();

const cookieSession = require('cookie-session');
const passport = require('passport');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}))
//inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/auth', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/home.html'));
});

module.exports = app;
