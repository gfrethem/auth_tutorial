/**
 * Created by gfrethem on 10/21/15.
 */

var app = angular.module('DigitalSongbook', []);

app.controller('DigitalSongbookController', ['$scope', '$http', function ($scope, $http) {

    ////Initialize Show/Hides
    //$scope.hideSongSearch = true;
    $scope.isAdmin = false;
    $scope.song = {};
    $scope.songs = [];
    $scope.singer = {};
    $scope.queue = [];
    $scope.history = [];
    $scope.savedSongs = [];


    $scope.twitterHandle = angular.element('#twitHandle').text();


    $http.get('/getImageURL/' + $scope.twitterHandle).then(function (response) {
        //console.log(response.data);
        $scope.userTwitPic = response.data;

        $http.get('/getDJ').then(function (response) {
            $scope.djinfo = response.data;
            //console.log($scope.djinfo);
            if ($scope.twitterHandle == $scope.djinfo.twitter.username) {
                $scope.isAdmin = true;
                $scope.showAdmin = true;
            }
            //console.log($scope.isAdmin);

            $http.get('/getImageURL/' + $scope.djinfo.twitter.username).then(function (response) {
                //console.log(response.data);
                $scope.djTwitPic = response.data;

            });

        });

    });

    var hideAllDivs = function () {
        $scope.hideWelcome = true;
        $scope.showSongSearch = false;
        $scope.showAdmin = false;
        $scope.showSavedSongs = false;
        $scope.showSongHistory = false;
    };

    $scope.gotoQueue = function () {
        $scope.getQueue();
        hideAllDivs();
        $scope.hideWelcome = false;
        if ($scope.isAdmin) {
            $scope.showAdmin = true
        }
    };

    $scope.gotoSearchSong = function () {
        hideAllDivs();
        $scope.showSongSearch = true;
    };

    $scope.gotoSavedSongs = function () {
        hideAllDivs();
        $scope.getSaved();
        $scope.showSavedSongs = true;
    };

    $scope.gotoSongHistory = function () {
        $scope.getHistory();
        hideAllDivs();
        $scope.showSongHistory = true;
    };

    $scope.markSung = function (singer) {
        $http.post('/markSung', singer).then(function (response) {
            $scope.getQueue();
        });
    };

    $scope.removeSong = function (singer) {
        $http.post('/removeSong', singer).then(function (response) {
            $scope.getQueue();
        });
    };

    $scope.removeSavedSong = function (song) {
        $http.post('/removeSavedSong', song).then(function (response) {
            $scope.getSaved();
        });
    };


    $scope.getSongByTitle = function (title) {
        $http.get('/getSongs/Title/' + title).then(function (response) {
            $scope.songs = response.data;
            //console.log($scope.songs);
        })
    };

    $scope.getSongByArtist = function (artist) {
        $http.get('/getSongs/artist/' + artist).then(function (response) {
            $scope.songs = response.data;
            //console.log($scope.songs);
        })
    };

    $scope.getQueue = function () {
        $http.get('/getQueue').then(function (response) {
            $scope.queue = response.data;

        })
    };

    $scope.getHistory = function () {
        $http.get('/getHistory/' + $scope.twitterHandle).then(function (response) {
            $scope.history = response.data;

        })
    };

    $scope.getSaved = function () {
        $http.get('/getSaved/' + $scope.twitterHandle).then(function (response) {
            $scope.savedSongs = response.data;
        })
    };


    $scope.tweetRequest = function (song) {
        var historyObject = '{"singer": "' + $scope.twitterHandle + '", "song": {"title": "' + song.title
            + '", "artist": "' + song.artist + '", "genre": "' + song.genre + '"}, "performed": false}';
        $http.post('/saveHistory', historyObject);

        ////////////////////////////////////////////
        // This would be where it tweets the request
        ////////////////////////////////////////////
        //var message = "@" + $scope.twitterHandle + " would like to sing " + song.title + " by " + song.artist + " at @"
        //    + $scope.djinfo.twitter.username + "'s Karaoke!";
        //var messageObj = {text: message};
        //$http.post('/requestSong', messageObj).then(function(response) {
        //    alert('Request Sent via Twitter!');
        //});
    };

    $scope.saveSong = function (song) {
        var savedSongObject = '{"singer": "' + $scope.twitterHandle + '", "song": {"title": "' + song.title
            + '", "artist": "' + song.artist + '"}}';
        $http.post('/saveSong', savedSongObject);
        console.log('Saved Song DB entry: ', savedSongObject);
    };


    $scope.getQueue();

}]);