'use strict';
angular.module('nfolio')
.controller('NavCtrl', function ($scope, $location, Photo, Auth) {
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
   $scope.logout = function () {
      auth.logout();
   };
});
