"use strict";

findIt.controller("GameResultsController", function($scope, $window, GameStorageFactory) {

	let nashville = [36.1627, -86.7816];

	$scope.map = {
    center: nashville,
    zoom: 13
  };


  //need to show two markers - one stays from user's choice, need coord from firebase random place

  $scope.marker = {
    position: nashville,
	};

	$scope.playAgain = () => {
		console.log("clicked 'play again");
		$window.location.href = "#!/";
	};

	let gameObj = GameStorageFactory.getStoredGameObj();

	console.log("final obj", gameObj);


});