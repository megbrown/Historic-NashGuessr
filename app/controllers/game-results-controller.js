"use strict";

findIt.controller("GameResultsController", function($scope, $timeout, $window, GameStorageFactory) {

	$scope.score = "";
	$scope.marker = {};

	let getScore = () => {
		let newGameObj = GameStorageFactory.getStoredGameObj();

	  console.log(newGameObj);

	  $scope.score = newGameObj.score;

	  $scope.marker = {
	    position: [newGameObj.origLat, newGameObj.origLng]
		};

		console.log("scope score", $scope.score);
	};


	$scope.playAgain = () => {
		console.log("clicked 'play again");
		$window.location.href = "#!/";
	};

	getScore();

});