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

	let storeUsersScore = (userScoreObj) => {
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}user-scores.json`,
				angular.toJson(userScoreObj))
			.then( (response) => {
				console.log("response", response);
				resolve(response);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};

	return { getAllPlaces, storeUsersScore };

});