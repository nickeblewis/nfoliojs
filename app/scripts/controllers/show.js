'use strict';

angular.module('farnboroughyoApp')
  .controller('ShowCtrl', function ($scope, $location, $routeParams, $firebase, fbURL, fbRequestUrl, fbEvents) {
      var placeUrl = fbURL + $routeParams.placeId;
  	$scope.place = $firebase(new Firebase(placeUrl));
  });
