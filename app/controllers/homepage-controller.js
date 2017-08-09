"use strict";

findIt.controller("HomepageController", function($scope, $window, GameFactory, UserFactory) {

	let currentUser = null;
	let userPlaceArr = [];
	let counter = 0;

	$scope.playGame = () => {
		$window.location.href = "#!/photo";
	};

	UserFactory.isAuthenticated()
	.then( (user) => {
		currentUser = UserFactory.getUser();
		getUsersPlaces();
	});

	function getUsersPlaces() {
		GameFactory.getUsersPlaceIds(currentUser)
		.then( (userPlaceObj) => {
			let placeIdArr = [];
			angular.forEach(userPlaceObj, function(obj) {
				placeIdArr.push(obj.placeid);
			});
			placeIdArr.forEach( (placeId) => {
				GameFactory.getUsersPlaces(placeId)
				.then( (userPlaceObj) => {
					angular.forEach(userPlaceObj, function(obj) {
						obj.counter = counter += 1;
						userPlaceArr.push(obj);
					});
				$scope.usersPlaces = userPlaceArr;
				});
			});
		});
	}


});