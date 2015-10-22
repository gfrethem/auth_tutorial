// server.js

// set up ======================================================================
// get all the tools we need
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

// Twitter Node Module =========================================================

var Twitter = require('twitter');


var client = new Twitter({
    consumer_key: 'ipcoEpKbdVbSMsT7z1hvQpRpP',
    consumer_secret: 'h5PI22ZOx4GFj6ZP6T0t0gonYW9PFUhgV4GeCv5okkF0uBVd1q',
    access_token_key: '48540710-oJ5KzBSiUV8G9xyQ8WO2tRpOWD3t3k53oTuS9Muim',
    access_token_secret: '9pMnKBXqMFVabKjU6v2ob4svoymgsXf28RcTNNnF5VCwX'
});


client.get('/users/show', {screen_name: 'GSeven330'}, function(error, tweets, response){
    console.log(tweets.profile_image_url);
    //dataArray = tweets;
    //console.log(response, error);
    //console.log(dataArray);
    //for(var i = 0; i < dataArray.length; i++){
    //    console.log(dataArray[i].user.name);
    //    console.log(dataArray[i].text);
    //}
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

app.use(express.static(__dirname + '/views'));
