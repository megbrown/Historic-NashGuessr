"use strict";

findIt.controller("PlaceDetailController", function($scope, $routeParams, $window, GameFactory, GameStorageFactory, UserFactory) {

	let nashville = [36.1627, -86.7816];

  $scope.map = {
    center: nashville,
    zoom: 13
  };

  GameFactory.getPlaceDetail($routeParams.placeId)
  .then( (place) => {
    angular.forEach(place, function(obj) {
      $scope.place = obj;
    });
  	console.log("detail place info", $scope.place);
  	// $scope.place = place;
  })
  .catch( (err) => {
  	console.log("error", err);
  });

  let newGameObj = GameStorageFactory.getStoredGameObj();

  $scope.savePlace = () => {
  	let userPlaceObj = {
			placeid: newGameObj.id,
			uid: UserFactory.getUser()
		};
		GameFactory.storeUsersPlace(userPlaceObj);
		$window.location.href = "#!/homepage";
  };

});