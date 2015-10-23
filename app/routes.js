/**
 * Created by gfrethem on 10/20/15.
 */
// app/routes.js
path = require('path');
var User = require('./models/user');
module.exports = function(app, passport) {


    app.get('/', function(req, res) {
        res.sendfile(path.join(__dirname, '../views/index.html'));
    });

    app.get('/songbook', isLoggedIn, function(req, res) {
        res.render('songbook.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =====================================
// TWITTER ROUTES ======================
// =====================================
// route for twitter authentication and login
app.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/songbook',
        failureRedirect : '/'
    }));

    app.get('/getDJ', function(request, response, next) {
        User.find({isAdmin: true}, function(err, users) {
            response.json(users[0]);
        })

    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}