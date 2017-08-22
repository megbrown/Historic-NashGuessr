"use strict";

findIt.controller("HomepageController", function($scope, $window, GameFactory, UserFactory, NgMap) {

	NgMap.getMap().then(function(map) {
	});

	let currentUser = null;
	let userPlaceArr = [];
	let coordArr = [];
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
				obj.FBkey = key;
				placeIdArr.push(obj);
				currentPlaceId = obj.placeid;
			});
			let totalCount = placeIdArr.length;
			placeIdArr.forEach( (idObj) => {
				GameFactory.getUsersPlaces(idObj.placeid)
				.then( (userPlaceObj) => {
					angular.forEach(userPlaceObj, function(obj) {
						obj.counter = counter += 1;
						obj.FBkey = idObj.FBkey;
						obj.note = idObj.note;
						userPlaceArr.push(obj);
						if (userPlaceArr.length == totalCount) {
							showUserPlacePins(userPlaceArr);
						}
					});
				$scope.usersPlaces = userPlaceArr;
				});
			});
		});
	}

	function showUserPlacePins(userPlaceArr) {
		userPlaceArr.forEach( function(obj) {
			coordArr.push([obj.lat, obj.long]);
		});
		$scope.userPlacesCoords = coordArr;
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
		$scope.scoreSum = userTotalScoreArr.reduce( (pv, cv) => pv + cv, 0);
	}

  $scope.addNote = (userObj) => {
  	GameFactory.addNoteToUserPlaces(userObj.note, userObj.FBkey)
  	.then( (data) => {
  	});
  };

  $scope.storeObj = (userObj) => {
  	$scope.selectedPlace = userObj;
  };

});