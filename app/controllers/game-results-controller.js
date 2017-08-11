"use strict";

findIt.controller("GameResultsController", function($scope, $timeout, $window, GameFactory, GameStorageFactory, UserFactory, NgMap) {

	let newGameObj = GameStorageFactory.getStoredGameObj();

	NgMap.getMap().then(function(map) {
  	// google.maps.event.addListener(map, 'click', function(e) {
   //  	placeMarker(e.latLng, map);
  	// });
	});

	console.log(newGameObj);

	$scope.score = newGameObj.score;
	$scope.message = newGameObj.message;

	$scope.marker = {
	  position: [newGameObj.origLat, newGameObj.origLng]
	};

	$scope.playAgain = () => {
		console.log("clicked 'play again");
		$window.location.href = "#!/homepage";
	};

	$scope.savePlace = () => {
		let userPlaceObj = {
			placeid: newGameObj.id,
			uid: UserFactory.getUser(),
		};
		GameFactory.storeUsersPlace(userPlaceObj)
		.then( (data) => {
			$window.location.href = "#!/homepage";
		});
	};

	$scope.seeDetail = () => {
		$window.location.href = `#!/place/${newGameObj.id}`;
	};

});