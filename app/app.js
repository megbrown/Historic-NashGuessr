"use strict";

let findIt = angular.module("FindIt", ["ngRoute", "ngMap"])
.constant("FirebaseUrl", "https://historic-places-1501858376214.firebaseio.com/")
.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  };
}]);

findIt.config(($routeProvider)=>{
  $routeProvider
  .when("/", {
    templateUrl: "templates/login.html",
    controller: "UserController"
  })
  .when("/homepage", {
    templateUrl: "templates/homepage.html",
    controller: "HomepageController"
  })
  .when("/photo", {
    templateUrl: "templates/game-photo.html",
    controller: "GamePhotoController"
  })
  .when("/map", {
  	templateUrl: "templates/game-map.html",
    controller: "GameMapController"
  })
  .when("/results", {
  	templateUrl: "templates/game-results.html",
  	controller: "GameResultsController"
  })
  .when("/place/:placeId", {
    templateUrl: "templates/place-detail.html",
    controller: "PlaceDetailController"
  })
  .otherwise('/');
});


