'use strict';
angular.module('nfolio')
	.controller('LoginCtrl', ['$scope', '$firebase', 'Auth', 'fbProfilesURL', '$location', function ($scope, $firebase, Auth, fbProfilesURL, $location, $q) {
    $scope.user = {};
    $scope.logindetails = {};
    $scope.loginError = '';
    
//     $scope.user.email = '';
//     $scope.user.password = '';
    
    $scope.login = function() {
      if($scope.myForm.$valid) {
        var loggedIn = Auth.login({email: $scope.email, password: $scope.password});
        loggedIn.then(function () {
          $location.path('/login');  
        }, function () {
          $scope.loginError = "Invalid email/password";
          console.log('Could not login for some reason - should display the message somewhere');
        });
      }
    };
  
		$scope.logout = function() {
      Auth.logout();
      $location.path('/');
//       $scope.$apply();
		};
  
		$scope.signedIn = function() {
			return Auth.signedIn();
		};
  
		$scope.signedInAs = function() {
			return Auth.signedInAs();
		};
  
    $scope.register = function() {
      Auth.register($scope.user);     
      Auth.login({email: $scope.user.remail,
      password: $scope.user.rpassword
    });
//       $location.path('/');
		};
	}]);
