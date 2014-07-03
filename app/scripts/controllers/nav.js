'use strict';
angular.module('nfolio')
.controller('NavCtrl', function ($scope, $location, Photo, Auth) {
   $scope.logout = function () {
      Auth.logout();
   };
});