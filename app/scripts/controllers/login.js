'use strict';
angular.module('farnboroughyoApp')
	.controller('LoginCtrl', function ($scope, $firebase, Auth, $location) {
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
			return Auth.signedInAs().email;
		};
  
		$scope.register = function() {
			Auth.register($scope.user);
// 			$location.path('/');
		};
	});
