'use strict';
angular.module('nfolio')
.controller('AuthCtrl',
   function ($scope, $location, Auth, User) {
     $scope.user = {};
     $scope.error = {};

     $scope.auth = Auth;

     $scope.logout = function () {
       Auth.logout();
     };

     $scope.login = function () {
        Auth.login($scope.user);
     };

     $scope.register = function () {
       Auth.register($scope.user);
      //  .then(function(data){
      //    $scope.error = data;
      //  }).catch(function(err){
      //    $scope.error = err;
      //  });
     };
   });
