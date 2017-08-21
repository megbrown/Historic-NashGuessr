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

let isAuth = (UserFactory)  => {
    return new Promise( (resolve, reject) => {
        UserFactory.isAuthenticated()
        .then( (userExistence) => {
            if (userExistence) {
                resolve();
            } else {
                reject();
            }
        });
    });
};

findIt.config(($routeProvider) => {
  $routeProvider
  .when("/", {
    templateUrl: "templates/login.html",
    controller: "UserController"
  })
  .when("/homepage", {
    templateUrl: "templates/homepage.html",
    controller: "HomepageController",
    resolve: {isAuth}
  })
  .when("/photo", {
    templateUrl: "templates/game-photo.html",
    controller: "GamePhotoController",
    resolve: {isAuth}
  })
  .when("/map", {
  	templateUrl: "templates/game-map.html",
    controller: "GameMapController",
    resolve: {isAuth}
  })
  .when("/results", {
  	templateUrl: "templates/game-results.html",
  	controller: "GameResultsController",
    resolve: {isAuth}
  })
  .when("/place/home/:placeId", {
    templateUrl: "templates/place-detail-home.html",
    controller: "PlaceDetailController",
    resolve: {isAuth}
  })
  .when("/place/:placeId", {
    templateUrl: "templates/place-detail.html",
    controller: "PlaceDetailController",
    resolve: {isAuth}
  })
  .otherwise('/');
});
