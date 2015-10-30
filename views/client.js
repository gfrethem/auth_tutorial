/**
 * Created by gfrethem on 10/21/15.
 */

var app = angular.module('DigitalSongbook', []);

app.controller('DigitalSongbookController', ['$scope', '$http', function ($scope, $http) {

    // Initialize Show/Hides/Arrays/Objects
    $scope.isAdmin = false;
    $scope.showStartHere = true;
    $scope.song = {};
    $scope.songs = [];
    $scope.singer = {};
    $scope.queue = [];
    $scope.history = [];
    $scope.savedSongs = [];

    // Read Twitter Handle from template into a variable
    $scope.twitterHandle = angular.element('#twitHandle').text();

    // GET call to get User's Twitter Image
    $http.get('/getImageURL/' + $scope.twitterHandle).then(function (response) {
        $scope.userTwitPic = response.data;

        // GET call to get DJ's Twitter Name / Set's isAdmin if user is admin
        $http.get('/getDJ').then(function (response) {
            $scope.djinfo = response.data;
            if ($scope.twitterHandle == $scope.djinfo.twitter.username) {
                $scope.isAdmin = true;
                $scope.showAdmin = true;
            }

            // GET call to get DJ's Twitter Image
            $http.get('/getImageURL/' + $scope.djinfo.twitter.username).then(function (response) {
                $scope.djTwitPic = response.data;
            });
        });
    });

    // Function to hide divs when navigating to a new one
    var hideAllDivs = function () {
        $scope.hideWelcome = true;
        $scope.showSongSearch = false;
        $scope.showAdmin = false;
        $scope.showSavedSongs = false;
        $scope.showSongHistory = false;
    };

    // Navigate to Queue
    $scope.gotoQueue = function () {
        $scope.getQueue();
        hideAllDivs();
        $scope.hideWelcome = false;
        if ($scope.isAdmin) {
            $scope.showAdmin = true
        }
    };

    // Navigate to Song Search
    $scope.gotoSearchSong = function () {
        hideAllDivs();
        $scope.showSongSearch = true;
    };

    // Navigate to Saved Songs
    $scope.gotoSavedSongs = function () {
        hideAllDivs();
        $scope.getSaved();
        $scope.showSavedSongs = true;
    };

    // Navigate to Song History
    $scope.gotoSongHistory = function () {
        $scope.getHistory();
        hideAllDivs();
        $scope.showSongHistory = true;
    };

    // GET call to list all singers/songs in Queue
    $scope.getQueue = function () {
        $http.get('/getQueue').then(function (response) {
            $scope.queue = response.data;
        })
    };

    // Admin Function - Marks song as sung
    $scope.markSung = function (singer) {
        $http.post('/markSung', singer).then(function (response) {
            $scope.getQueue();
        });
    };

    // Admin Function - Removes song from Queue
    $scope.removeSong = function (singer) {
        $http.post('/removeSong', singer).then(function (response) {
            $scope.getQueue();
        });
    };

    // Searches for songs by title
    $scope.getSongByTitle = function (title) {
        $http.get('/getSongs/Title/' + title).then(function (response) {
            $scope.songs = response.data;
        })
    };

    // Searches for songs by Artist
    $scope.getSongByArtist = function (artist) {
        $http.get('/getSongs/artist/' + artist).then(function (response) {
            $scope.songs = response.data;
        })
    };

    // Lists ALL songs
    $scope.listAllSongs = function (artist) {
        $http.get('/getSongs/All').then(function (response) {
            $scope.songs = response.data;
        })
    };

    // Removes saved song from User's Saved List
    $scope.removeSavedSong = function (song) {
        $http.post('/removeSavedSong', song).then(function (response) {
            $scope.getSaved();
        });
    };

    // GET call to get Singer's Song History
    $scope.getHistory = function () {
        $http.get('/getHistory/' + $scope.twitterHandle).then(function (response) {
            $scope.history = response.data;
        })
    };

    // GET call to get Singer's Saved Songs
    $scope.getSaved = function () {
        $http.get('/getSaved/' + $scope.twitterHandle).then(function (response) {
            $scope.savedSongs = response.data;
        })
    };

    // Request Song Function
    $scope.tweetRequest = function (song) {

        // Build Object for Song History in database
        var historyObject = '{"singer": "' + $scope.twitterHandle + '", "song": {"title": "' + song.title
            + '", "artist": "' + song.artist + '", "genre": "' + song.genre + '"}, "performed": false}';

        // POST Song History Entry it database
        $http.post('/saveHistory', historyObject);

        // Build Object for Tweet text
        var message = "@" + $scope.twitterHandle + " would like to sing " + song.title + " by " + song.artist + " at @"
            + $scope.djinfo.twitter.username + "'s Karaoke!";
        var messageObj = {text: message};

        // POST Tweet
        $http.post('/requestSong', messageObj).then(function(response) {
            alert('Request Sent via Twitter!');
        });
    };

    // Save Song Function
    $scope.saveSong = function (song) {

        // Build Object for Saving Song to User's List
        var savedSongObject = '{"singer": "' + $scope.twitterHandle + '", "song": {"title": "' + song.title
            + '", "artist": "' + song.artist + '"}}';

        // POST Saved Song Entry it database
        $http.post('/saveSong', savedSongObject);
        console.log('Saved Song DB entry: ', savedSongObject);
    };

    // Get the Queue for landing page of application
    $scope.getQueue();

}]);