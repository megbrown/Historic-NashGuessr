"use strict";

findIt.controller("MapController", function(ngMap) {
	ngMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

  scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=APIKeyHere";

});
