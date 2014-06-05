'use strict';
angular.module('nfolio')
	.controller('LoginCtrl', ['$scope', '$firebase', 'Auth', '$location', function ($scope, $firebase, Auth, $location) {
		$scope.user = {};
    
		$scope.login = function() {
			Auth.login($scope.user);
// 			$location.path('/');
		};
  
		$scope.logout = function() {
			Auth.logout();
// 			$location.path('/');
		};
  
		$scope.signedIn = function() {
			return Auth.signedIn();
		};
  
		$scope.signedInAs = function() {
			return Auth.signedInAs();
		};
  
		$scope.register = function() {
			Auth.register($scope.user);
// 			$location.path('/');
		};
	}]);
