'use strict';
angular.module('nfolio')
.controller('NavCtrl', function ($scope, $location, Photo, Auth) {
    $scope.auth = Auth;
    $scope.user = Auth.getAuth();

    $scope.loggedIn = function () {
      return true;
    };
    
   $scope.logout = function () {
      Auth.logout();
   };

   $scope.loginWithOAuth = function () {
     Auth.loginWithOAuth();
     $location.path('/');
   };
});
