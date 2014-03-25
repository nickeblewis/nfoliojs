'use strict';
/*global Firebase*/
angular.module('farnboroughyoApp')
  .controller('ShowCtrl', function ($scope, $location, $routeParams, $firebase, fbURL) {
    var placeUrl = fbURL + $routeParams.placeId;
    $scope.place = $firebase(new Firebase(placeUrl));
  });
