/**
 * Created by gfrethem on 10/21/15.
 */

var app = angular.module('DigitalSongbook', []);

app.controller('DigitalSongbookController', ['$scope', '$http', function ($scope, $http) {

$scope.twitterHandle = angular.element('#twitHandle').text();

    $http.get('/getImageURL/' + $scope.twitterHandle).then(function(response) {
        console.log(response.data);
        $scope.userTwitPic = response.data;

        $http.get('/getDJ').then(function(response) {
            $scope.djinfo = response.data;
            console.log($scope.djinfo);

            $http.get('/getImageURL/' + $scope.djinfo.twitter.username).then(function(response) {
                console.log(response.data);
                $scope.djTwitPic = response.data;

            });

        });

    });








}]);