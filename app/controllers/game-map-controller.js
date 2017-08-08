"use strict";

findIt.controller("GameMapController", function($scope, $window, NgMap, MapFactory, GameStorageFactory) {

	let userGuess = {};
	let origPlace = {};

//load map and event listener for user click
	NgMap.getMap().then(function(map) {
  	google.maps.event.addListener(map, 'click', function(e) {
    	placeMarker(e.latLng, map);
  	});
	});

	function placeMarker(position, map) {
		let marker = new google.maps.Marker({
  		position: position,
  		map: map
		});
		let lat = position.lat();
		let lng = position.lng();
		userGuess = {
			guessLat: lat,
			guessLng: lng
		};
		GameStorageFactory.storeUsersGuess(userGuess);
		console.log("user's guess", userGuess.guessLat, userGuess.guessLng);
	}

	let nashville = [36.1627, -86.7816];

  $scope.map = {
    center: nashville,
    zoom: 13
  };

	$scope.goToResults = () => {
		console.log("clicked 'see results'");
		$window.location.href = "#!/results";
	};


	let newGameObj = GameStorageFactory.getStoredGameObj();
	console.log("new game obj", newGameObj);

// I think I am getting the guessLat and lng to soon

	$scope.fetchDistance = () => {
		console.log("clicked 'see results'");
		console.log("orig", newGameObj.origLat, newGameObj.origLng);
		console.log("guess", userGuess.guessLat, userGuess.guessLng);
	 	let origin = new google.maps.LatLng(newGameObj.origLat, newGameObj.origLng);
		let destination = new google.maps.LatLng(userGuess.guessLat, userGuess.guessLng);
		MapFactory.getDistance(origin, destination)
		.then( (distance) => {
			let newDistance = {
				distance: MapFactory.getCurrentDistance()
			};
			GameStorageFactory.storeDistance(newDistance);
			console.log("distance?", newDistance);
		});
		$window.location.href = "#!/results";
	};



});