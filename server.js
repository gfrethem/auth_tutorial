// server.js

// set up ======================================================================
// get all the tools we need
require('dotenv').load();
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
//var User            = require('./app/models/user');
// Twitter Node Module =========================================================

var Twitter = require('twitter');


var client = new Twitter({
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    access_token_key: process.env.twitter_access_token_key,
    access_token_secret: process.env.twitter_access_token_secret
});



// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);



app.get('/getImageURL/:screenName', function(request, response, next) {

    client.get('/users/show', {screen_name: request.params.screenName}, function(error, tweets){
        twitterData = tweets.profile_image_url;
        //console.log(twitterData);
        response.json(twitterData);
        return twitterData;

    });

});

app.post('/requestSong', function(request, response, next) {
    //console.log(request.body);
    client.post('statuses/update', {status: request.body.text}, function(error, tweet){
        if (!error) {
            console.log(tweet);
        } else {
            console.log(error);
        }
        response.send("OK");
    });
});


app.use(express.static(__dirname + '/views'));

module.exports = client;