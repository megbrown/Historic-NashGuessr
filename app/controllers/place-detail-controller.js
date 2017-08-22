"use strict";

findIt.controller("PlaceDetailController", function($scope, $routeParams, $window, GameFactory, GameStorageFactory, UserFactory, NgMap) {

  NgMap.getMap().then(function(map) {
  });

  let currentGameObj = GameStorageFactory.getStoredGameObj();
  let currentUser = UserFactory.getUser();

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
    GameFactory.storeUsersPlace(userPlaceObj)
    .then( (data) => {
      $window.location.href = "#!/homepage";
      $window.location.reload(true);
    });
  };

});