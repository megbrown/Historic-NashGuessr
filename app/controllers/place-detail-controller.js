"use strict";

findIt.controller("PlaceDetailController", function($scope, $routeParams, GameFactory) {

	let nashville = [36.1627, -86.7816];

  $scope.map = {
    center: nashville,
    zoom: 13
  };

  GameFactory.getPlaceDetail($routeParams.placeId)
  .then( (place) => {
  	console.log("detail place info", place);
  	$scope.place = place;
  })
  .catch( (err) => {
  	console.log("error", err);
  });

});