'use strict';
angular.module('nfolio')
	.controller('LoginCtrl', ['$scope', '$firebase', 'Auth', 'fbProfilesURL', '$location', function ($scope, $firebase, Auth, fbProfilesURL, $location) {
		$scope.user = {};
    
		$scope.login = function() {
			Auth.login($scope.user);
		};
  
		$scope.logout = function() {
			Auth.logout();
		};
  
		$scope.signedIn = function() {
			return Auth.signedIn();
		};
  
		$scope.signedInAs = function() {
			return Auth.signedInAs();
		};
  
    $scope.register = function() {
      Auth.register($scope.user);      
		};
	}]);
