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
		let placeIdArr = [];
		let currentPlaceId;
		GameFactory.getUsersPlaceIds(currentUser)
		.then( (userPlaceObj) => {
			angular.forEach(userPlaceObj, function(obj, key) {
				console.log("key", key);
				obj.FBkey = key;
				placeIdArr.push(obj);
				console.log("place id array", placeIdArr);
				currentPlaceId = obj.placeid;
				console.log("current place id 1", currentPlaceId);
			});
			placeIdArr.forEach( (idObj) => {
				GameFactory.getUsersPlaces(idObj.placeid)
				.then( (userPlaceObj) => {
					angular.forEach(userPlaceObj, function(obj) {
						obj.counter = counter += 1;
						obj.FBkey = idObj.FBkey;
						userPlaceArr.push(obj);
					});
				$scope.usersPlaces = userPlaceArr;
				console.log("user place array", userPlaceArr);
				});
			});
		});
	}

	// click delete
	// get place id
	// get all users places
	// compare place id to users places
	// then get user-place key for matching pair

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
		$scope.scoreSum = userTotalScoreArr.reduce( (pv, cv) => pv + cv, 0);
	}

	$scope.editNote = (userPlaceKeyId) => {
		GameFactory.editNote(userPlaceKeyId)
		.then( (data) => {
			$window.location.reload(true);
		});
  };

  $scope.deleteNote = (userPlaceKeyId) => {
  	if ($window.confirm("Are you sure you want to delete this note?")) {
			GameFactory.deleteNote(userPlaceKeyId)
			.then( (data) => {
				$window.location.reload(true);
			});
		}
  };

});