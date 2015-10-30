/**
 * Created by gfrethem on 10/20/15.
 */
// app/routes.js
path = require('path');
var User = require('./models/user');
var Song = require('./models/songs');
var DJHistory = require('./models/djhistory');
var SavedSongs = require('./models/savedsongs');


module.exports = function (app, passport) {


    app.get('/', function (req, res) {
        res.sendfile(path.join(__dirname, '../views/index.html'));
    });

    app.get('/songbook', isLoggedIn, function (req, res) {
        res.render('songbook.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function (req, res) {
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
            successRedirect: '/songbook',
            failureRedirect: '/'
        })
    );

    app.get('/getDJ', function (request, response, next) {
        User.find({isAdmin: true}, function (err, users) {
            response.json(users[0]);
        })

    });

    app.get('/getSongs/title/:query', function (request, response, next) {
        Song.find({title: {'$regex': request.params.query, '$options': 'i'}}, function (err, songs) {
            console.log('User searched for title: ', request.params.query);
            response.json(songs);
        })
    });

    app.get('/getSongs/artist/:query', function (request, response, next) {
        Song.find({artist: {'$regex': request.params.query, '$options': 'i'}}, function (err, songs) {
            console.log('User searched for artist: ', request.params.query);
            response.json(songs);
        })
    });

    app.get('/getSongs/All', function (request, response, next) {
        Song.find({}).sort('artist').exec(function (err, songs) {
            console.log('User requested a list of all songs');
            response.json(songs);
        })
    });

    app.get('/getHistory/:query', function (request, response, next) {
        DJHistory.find({singer: request.params.query, performed: true}, function (err, history) {
            console.log('History search for user: ', request.params.query);
            response.json(history);
        })
    });

    app.get('/getSaved/:query', function (request, response, next) {
        SavedSongs.find({singer: request.params.query}, function (err, savedSongs) {
            console.log('Saved Song search for user: ', request.params.query);
            response.json(savedSongs);
        })
    });

    app.post('/saveHistory', function (request, response, next) {
        var newDJHistory = new DJHistory(request.body);
        newDJHistory.save();
        console.log('History DB entry: ', request.body);
        response.send("ok");
    });

    app.post('/saveSong', function (request, response, next) {
        var newSavedSong = new SavedSongs(request.body);
        newSavedSong.save();
        console.log('Saved Song DB entry: ', request.body);
        response.send("ok");
    });

    app.get('/getQueue', function (request, response, next) {
        DJHistory.find({performed: false}, function (err, singers) {
            console.log("Queue Refreshed");
            response.json(singers);
        })

    });

    app.post('/markSung', function (request, response, next) {
        console.log("Marked " + request.body.song.title + " by " + request.body.song.artist + " as performed by "
            + request.body.singer);
        var receivedData = request.body;
        DJHistory.findById(receivedData._id, function (err, djhistory) {
            if (err) throw err;
            djhistory.performed = true;
            djhistory.performedDate = new Date;
            djhistory.save(function (err) {
                if (err) throw err;
                response.send("OK");
            })
        })
    });

    app.post('/removeSong', function (request, response, next) {
        console.log("Removing " + request.body.song.title + " by " + request.body.song.artist + " from Queue");
        var receivedData = request.body;
        DJHistory.remove({_id: receivedData._id}, function () {
            response.send("OK");
        })
    });

    app.post('/removeSavedSong', function (request, response, next) {
        console.log("Removing " + request.body.song.title + " by " + request.body.song.artist
            + " from " + request.body.singer + "'s Saved Songs.");
        var receivedData = request.body;
        SavedSongs.remove({_id: receivedData._id}, function () {
            response.send("OK");
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