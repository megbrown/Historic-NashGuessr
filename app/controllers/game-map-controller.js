"use strict";

findIt.controller("GameMapController", function($scope, $window, NgMap, MapFactory, GameFactory, UserFactory, GameStorageFactory) {

	let userGuess = {};
	let origPlace = {};

	NgMap.getMap().then(function(map) {
  	google.maps.event.addListener(map, 'click', function(e) {
    	placeMarker(e.latLng, map);
  	});

    // google.maps.event.addListener(map, 'click', function(event) {
    //   placeMarker(event.latLng);
    // });

	});



// var marker;

// function placeMarker(location) {
//   if ( marker ) {
//     marker.setPosition(location);
//   } else {
//     marker = new google.maps.Marker({
//       position: location,
//       map: map
//     });
//   }
// }

// google.maps.event.addListener(map, 'click', function(event) {
//   placeMarker(event.latLng);
// });



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

	let nashville = [36.1627, -86.7816];

  $scope.map = {
    center: nashville,
    zoom: 13
  };

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
  		message = "You know everything, don't you.";
  	} else if (distance > 0.5 && distance <= 1) {
  		score = 90;
  		message = "Why didn't you get 100?";
  	} else if (distance > 1 && distance <= 5) {
  		score = 75;
  		message = "Do better next time.";
  	} else if (distance > 5 && distance <= 10) {
  		score = 50;
  		message = "Do you like being average?";
  	} else if (distance > 10 && distance <= 20) {
  		score = 25;
  		message = "Do you know anything?";
  	} else {
  		score = 0;
  		message = "Just go home.";
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