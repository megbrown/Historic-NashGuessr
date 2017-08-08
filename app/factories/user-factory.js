"use strict";

findIt.factory('UserFactory', function($q, $http, FirebaseUrl, FBCreds) {

	var config = {
		apiKey: FBCreds.apiKey,
		authDomain: FBCreds.authDomain
	};

	firebase.initializeApp(config);

	var provider = new firebase.auth.GoogleAuthProvider();

	let currentUser = null;

	let isAuthenticated = () => {
		return $q( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if(user) {
					currentUser = user.uid;
					resolve(true);
				}
				else { //on logout we need to set it back to null.
					currentUser = null;
					resolve(false);
				}
			});
		});
	};

	let loginUser = () => {
		return $q( (resolve, reject) => {
			firebase.auth().signInWithPopup( provider)
			.then( (data) => {
			currentUser = data.user.uid;
			console.log("currentUser", currentUser);
			resolve(data);
		  })
		  .catch( (err) => {
			console.log("error logging in", err.message);
		  });
		});
	};


	let getUser = () => {
		return currentUser;
	};

	let logoutUser = () => {
		return firebase.auth().signOut()
		.catch( (err) => {
			console.log("Error logging out", err.message);
		});
	};

	return {loginUser, isAuthenticated, getUser, logoutUser};

});