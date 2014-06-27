'use strict';

angular.module('nfolio')
.controller('ApplicationCtrl', ['$rootScope', '$scope', 'USER_ROLES', 'AUTH_EVENTS', 'Auth', 'Session', function ($rootScope, $scope, USER_ROLES, AUTH_EVENTS, Auth, Session) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = Auth.isAuthorized;

  $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
    $scope.currentUser = Session.userId;
  });

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
    $scope.currentUser = null;
  });

  $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
    $scope.currentUser = null;
  });
}]);
