"use strict";

findIt.controller("GamePhotoController", function($window, $scope, GameFactory, GameStorageFactory) {

	let allPlaceArr = [];

	$scope.goToMap = () => {
		console.log("clicked 'find on map'");
		$window.location.href = "#!/map";
	};

	GameFactory.getAllPlaces()
	.then( (allPlaces) => {
		angular.forEach(allPlaces, function(obj) {
			allPlaceArr.push(obj);
		});
		getRandomPlace();
	});

	function getRandomPlace() {
		let randomPlace = allPlaceArr[Math.floor(Math.random()*allPlaceArr.length)];
		console.log(randomPlace);
		$scope.image = randomPlace.photo;
		GameStorageFactory.storeGameObj(randomPlace);
	}

});