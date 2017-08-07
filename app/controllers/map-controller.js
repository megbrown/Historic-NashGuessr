"use strict";


findIt.controller("MapController", function($scope, NgMap, MapFactory) {


// function that loads map? inside adding event listener for placing a marker and getting lat/long values
// why is the user's guess console logging twice
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
		let userGuess = [lat, lng];
		console.log("user's guess", userGuess);
	}

// function to get the distance - calls a function with callback on map-factory, having trouble
// returning the distance here
	$scope.fetchDistance = () => {
	 	var origin = new google.maps.LatLng(36.1627, -86.7816);
		var destination = new google.maps.LatLng(36.105815, -86.7753609999999);
		MapFactory.getDistance(origin, destination)
		.then( (distance) => {
			let newDistance = MapFactory.getCurrentDistance();
			console.log("distance?", newDistance);
		});
	};

// sets the map center
	let nashville = [36.1627, -86.7816];

  $scope.map = {
    center: nashville,
    zoom: 13
  };

// how to place a marker
  $scope.marker = {
    position: nashville,
	};

});





