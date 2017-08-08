"use strict";

findIt.controller("GameResultsController", function($scope, $timeout, $window, GameFactory, GameStorageFactory, UserFactory) {

		let newGameObj = GameStorageFactory.getStoredGameObj();

	  console.log(newGameObj);

	  $scope.score = newGameObj.score;
	  $scope.message = newGameObj.message;

	  $scope.marker = {
	    position: [newGameObj.origLat, newGameObj.origLng]
		};

	$scope.playAgain = () => {
		console.log("clicked 'play again");
		$window.location.href = "#!/";
	};

	$scope.savePlace = () => {
		let userPlaceObj = {
			placeid: newGameObj.id,
			uid: UserFactory.getUser()
		};
		GameFactory.storeUsersPlace(userPlaceObj);
		$window.location.href = "#!/homepage";
	};

});