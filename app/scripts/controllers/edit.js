'use strict';

/*global Firebase*/
angular.module('farnboroughyoApp')
  .controller('EditCtrl', function ($scope, $location, $routeParams, $firebase, fbURL) {
    var placeUrl = fbURL + $routeParams.placeId;
    $scope.place = $firebase(new Firebase(placeUrl));
 
    $scope.destroy = function() {
      $scope.place.$remove();
      $location.path('/');
    };
 
    $scope.save = function() {
      $scope.place.updated = (new Date()).getTime();
      $scope.place.$save();
      $location.path('/');
    };
  });
