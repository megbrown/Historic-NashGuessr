"use strict";

findIt.factory("MapFactory", function($q) {

	let currentDistance = "";

	let getDistance = (origin, destination) => {
		return $q( (resolve, reject) => {
			let service = new google.maps.DistanceMatrixService();
			service.getDistanceMatrix(
		  {
		    origins: [origin],
		    destinations: [destination],
		    travelMode:"DRIVING",
		  }, setDistance);
			function setDistance(response, status) {
	  		let distance = "";
	  		if (status == 'OK') {
	    		let origins = response.originAddresses;
	    		let destinations = response.destinationAddresses;
	    		for (let i = 0; i < origins.length; i++) {
	      		let results = response.rows[i].elements;
	      		for (let j = 0; j < results.length; j++) {
	        		let element = results[j];
	        		distance = element.distance.text;
	        		let duration = element.duration.text;
	        		let from = origins[i];
	        		let to = destinations[j];
	      		}
	    		}
	  		}
	 			currentDistance = distance;
	  		resolve(currentDistance);
			}
		});
	};

	function getCurrentDistance() {
		return currentDistance;
	}

	return { getDistance, getCurrentDistance };

});


