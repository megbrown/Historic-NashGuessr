"use strict";

findIt.controller("HomepageController", function($scope, $window, GameFactory, UserFactory) {

	let currentUser = null;
	let userPlaceArr = [];
	let counter = 0;

	$scope.playGame = () => {
		$window.location.href = "#!/photo";
	};

	$scope.deletePlace = (userPlaceKeyId) => {
		if ($window.confirm("Are you sure you want to delete this place?")) {
			GameFactory.deletePlace(userPlaceKeyId)
			.then( (data) => {
				$window.location.reload(true);
			});
		}
	};

	UserFactory.isAuthenticated()
	.then( (user) => {
		currentUser = UserFactory.getUser();
		getUsersPlaces();
		getUsersScores();
	});

	function getUsersPlaces() {
		GameFactory.getUsersPlaceIds(currentUser)
		.then( (userPlaceObj) => {
			let placeIdArr = [];
			angular.forEach(userPlaceObj, function(obj, key) {
				placeIdArr.push(obj.placeid);
				$scope.userPlaceKeyId = key;
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

	function getUsersScores() {
		GameFactory.getUsersScores(currentUser)
		.then( (usersScoreObj) => {
			let userScoreObjArr = [];
			let userTotalScoreArr = [];
			angular.forEach(usersScoreObj, function(obj) {
				userScoreObjArr.push(obj);
				userTotalScoreArr.push(obj.score);
			});
			userScoreObjArr.sort( function(a, b) {
				return b.orderid - a.orderid;
			});
			let scoreArr = userScoreObjArr.slice(0,5);
			$scope.usersScores = scoreArr;
			getUsersTotalScore(userTotalScoreArr);
		});
	}

	function getUsersTotalScore(userTotalScoreArr) {
		$scope.scoreSum = userTotalScoreArr.reduce((pv, cv) => pv+cv, 0);
	}

});