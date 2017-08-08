"use strict";

findIt.controller("HomepageController", function($scope, $window) {

	$scope.playGame = () => {
		$window.location.href = "#!/photo";
	};

});