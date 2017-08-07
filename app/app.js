"use strict";

let findIt = angular.module("FindIt", ["ngRoute", "ngMap"]);

findIt.config(($routeProvider)=>{
  $routeProvider
  .when('/', {
      templateUrl: 'templates/map-template.html',
      controller: 'MapController'
  })
  .otherwise('/');
});


