"use strict";

findIt.controller("GameResultsController", function($scope, $timeout, $window, GameFactory, GameStorageFactory, UserFactory, NgMap) {

	let newGameObj = GameStorageFactory.getStoredGameObj();

	NgMap.getMap().then(function(map) {
	});

	console.log(newGameObj);

	$scope.score = newGameObj.score;
	$scope.message = newGameObj.message;

	$scope.marker = {
	  position: [newGameObj.origLat, newGameObj.origLng]
	};

	$scope.playAgain = () => {
		console.log("clicked 'play again");
		$window.location.href = "#!/photo";
	};

	$scope.seeDetail = () => {
		$window.location.href = `#!/place/${newGameObj.id}`;
	};

});