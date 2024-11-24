const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../NodeJS - Copy/routes/userRoutes');
const connectDB = require('../NodeJS - Copy/config/db');
const productRoute = require('../NodeJS - Copy/routes/productRoutes');
const purchaseRouter = require('./routes/purchaseRoutes');
const passport = require('passport');
const app = express();


require('./auth');
var session = require('express-session')

app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());

const isAuthenticated = async (req, res, next) => {
    console.log("isAuthenticated req",req);
    if (req.isAuthenticated()) {
        await connectDB();
        return next();
    }
    res.redirect(`/`);
}

app.use(bodyParser.json());


// 
app.get('/', (req, res) => {
    res.send(`<a href="/auth/google">Login with Google</a>`);
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile','https://www.googleapis.com/auth/contacts.readonly'] }));

    const data = (req, res) => {
        res.redirect('/loggedIn');
    };
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), data);

const loggIN = (req, res) => {
    res.send(`Hello ${req.user.displayName}! <a href="/logout">Logout</a>`)
};

app.get('/loggedIn', isAuthenticated, loggIN);



app.get('/logout', isAuthenticated, (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.use('/api/user', isAuthenticated, userRoutes);
app.use('/api/product', isAuthenticated, productRoute);
app.use('/api/purchase', isAuthenticated, purchaseRouter);





module.exports = app;