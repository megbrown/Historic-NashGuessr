"use strict";

findIt.controller("GameResultsController", function($scope, $window, GameStorageFactory) {

  let newGameObj = GameStorageFactory.getStoredGameObj();

  console.log(newGameObj);

  $scope.marker = {
    position: [newGameObj.origLat, newGameObj.origLng]
	};

	$scope.playAgain = () => {
		console.log("clicked 'play again");
		$window.location.href = "#!/";
	};

});