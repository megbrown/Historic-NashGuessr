"use strict";

findIt.factory("GameFactory", function($q, $http, FirebaseUrl) {

	let getAllPlaces = () => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}places.json`)
			.then( (places) => {
				let allPlaces = places.data;
				resolve(allPlaces);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	return { getAllPlaces };

});