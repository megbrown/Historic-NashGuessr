"use strict";

findIt.controller("PlaceDetailController", function($scope, $routeParams, $window, GameFactory, GameStorageFactory, UserFactory) {

	 let currentGameObj = GameStorageFactory.getStoredGameObj();

  // let nashville = [36.1627, -86.7816];

  // $scope.map = {
  //   center: nashville,
  //   zoom: 13
  // };

  $scope.marker = {
    position: [currentGameObj.origLat, currentGameObj.origLng]
  };

  GameFactory.getPlaceDetail($routeParams.placeId)
  .then( (place) => {
    angular.forEach(place, function(obj) {
      $scope.place = obj;
    });
  })
  .catch( (err) => {
  	console.log("error", err);
  });

  let currentUser = UserFactory.getUser();
  console.log(currentUser);

  GameFactory.getUsersPlaceIds(currentUser)
  .then( (userPlaces) => {
    console.log("users places, place-detail-controller", userPlaces);
    angular.forEach( userPlaces, function(obj) {
      console.log("place-detail-controller, user places placeid", obj.placeid);
      if (obj.placeid === $routeParams.placeId) {
        console.log("its a match!", obj.placeid);
        $scope.note = obj.note;
      }
    });
  });


// match to the place id which I have access to from $routeParams
//     if userPlaceObj.placeid === $routeParams.placeId
//     then $scope.note = userPlaceObj.note;


});