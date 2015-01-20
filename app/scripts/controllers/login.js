// TODO: Superceded by auth.js, so can probably go??
'use strict';
angular.module('nfolio')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$firebase', 'Auth', 'fbProfilesURL', '$location', '$q', 'AUTH_EVENTS', function($rootScope, $scope, $firebase, Auth, fbProfilesURL, $location, $q, AUTH_EVENTS) {
    $scope.user = {};
    $scope.logindetails = {};
    $scope.loginError = '';
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function(credentials) {
      Auth.login(credentials).then(function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };

    $scope.logout = function() {
      Auth.logout();
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $location.path('/');
    };

    $scope.register = function() {
      Auth.register($scope.user);
      Auth.login({
        email: $scope.user.remail,
        password: $scope.user.rpassword
      });
    };
  }]);