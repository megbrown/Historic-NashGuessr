"use strict";

findIt.controller("GameMapController", function($scope, $window, NgMap, MapFactory, GameFactory, UserFactory, GameStorageFactory) {

	let userGuess = {};
	let origPlace = {};

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
	}

	let newGameObj = GameStorageFactory.getStoredGameObj();

	$scope.fetchDistance = () => {
		console.log("clicked 'see results'");
	 	let origin = new google.maps.LatLng(newGameObj.origLat, newGameObj.origLng);
		let destination = new google.maps.LatLng(userGuess.guessLat, userGuess.guessLng);
		MapFactory.getDistance(origin, destination)
		.then( (distance) => {
			let newDistance = {
				distance: MapFactory.getCurrentDistance()
			};
			calculateScore(newDistance.distance);
		});
	};

	let score = 0;
	let message = "";
  let userScoreObj = {};

  function calculateScore(distance) {
  	if (distance <= 0.5) {
  		score = 100;
  		message = "Perfect score. Great job!";
  	} else if (distance > 0.5 && distance <= 1) {
  		score = 90;
  		message = "Almost there. Good work!";
  	} else if (distance > 1 && distance <= 3) {
      score = 80;
      message = "You were so close! Good job";
    } else if (distance > 3 && distance <= 5) {
      score = 70;
      message = "In the right vicinity. Good job!";
    } else if (distance > 5 && distance <= 7) {
  		score = 50;
  		message = "Getting there. Why not try again?";
  	} else if (distance > 7 && distance <= 10) {
  		score = 35;
  		message = "Good try! Better luck next time.";
  	} else if (distance > 10 && distance <= 20) {
  		score = 25;
  		message = "Good try! Better luck next time.";
  	} else {
  		score = 0;
  		message = "That was a tough one. Why not try again?";
  	}
    GameStorageFactory.storeScore(score, message);
    storeScore(score);
  }

  function storeScore(score) {
    userScoreObj = {
      score: score,
      uid: UserFactory.getUser(),
      date: Date().toString().slice(4, 15),
      orderid: Date.now()
    };
    GameFactory.storeUsersScore(userScoreObj);
    $window.location.href = "#!/results";
  }

});