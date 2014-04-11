'use strict';

angular.module('farnboroughyoApp')
  .controller('CreateCtrl', function ($scope, $location, $timeout, fbRequestUrl) {
  $scope.save = function() {
    $scope.place.updated = (new Date()).getTime();
    fbRequestUrl.$add($scope.place, function() {
      $timeout(function() { $location.path('/'); });
    });
    
  };
});

