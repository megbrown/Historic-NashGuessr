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

  GameFactory.getUsersPlaceIds(currentUser)
  .then( (userPlaces) => {
    angular.forEach( userPlaces, function(obj) {
      if (obj.placeid === $routeParams.placeId) {
        $scope.note = obj.note;
      }
    });
  });

  $scope.savePlace = () => {
    let userPlaceObj = {
      placeid: currentGameObj.id,
      uid: UserFactory.getUser()
    };
    GameFactory.storeUsersPlace(userPlaceObj);
    $window.location.href = "#!/homepage";
  };


// match to the place id which I have access to from $routeParams
//     if userPlaceObj.placeid === $routeParams.placeId
//     then $scope.note = userPlaceObj.note;


});