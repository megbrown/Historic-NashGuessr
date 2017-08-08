"use strict";

let findIt = angular.module("FindIt", ["ngRoute", "ngMap"])
.constant("FirebaseUrl", "https://historic-places-1501858376214.firebaseio.com/");

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
  .otherwise('/');
});


