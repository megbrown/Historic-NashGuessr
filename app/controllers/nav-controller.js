"use strict";

findIt.controller("NavController", function($scope, $window, UserFactory) {

	$scope.logout = () => {
    UserFactory.logoutUser()
    .then( (data) => {
        $window.location.href = "#!/";
        alert('successfully logged out');
    });
  };

});