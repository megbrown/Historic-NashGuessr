"use strict";

findIt.controller("GameResultsController", function($scope, $timeout, $window, GameStorageFactory) {

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

});