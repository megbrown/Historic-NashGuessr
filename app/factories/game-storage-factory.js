"use strict";

findIt.factory("GameStorageFactory", function() {

	let gameObj = {};

	let storeGameObj = (gameObjStuff) => {
		gameObj.name = gameObjStuff.name;
		gameObj.origLat = gameObjStuff.lat;
		gameObj.origLng = gameObjStuff.long;
		gameObj.id = gameObjStuff.id;
	};

	let storeUsersGuess = (usersGuess) => {
		gameObj.guessLat = usersGuess.guessLat;
		gameObj.guessLng = usersGuess.guessLng;
	};

// needs to be score not distance
	let storeDistance = (distance) => {
		gameObj.distance = distance.distance;
	};

	let getStoredGameObj = () => {
		return gameObj;
	};

	return { storeGameObj, storeUsersGuess, storeDistance, getStoredGameObj };

});