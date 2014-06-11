'use strict';
angular.module('nfolio')
	.controller('LoginCtrl', ['$rootScope','$scope', '$firebase', 'Auth', 'fbProfilesURL', '$location', '$q', 'AUTH_EVENTS', function ($rootScope, $scope, $firebase, Auth, fbProfilesURL, $location, $q, AUTH_EVENTS) {
    $scope.user = {};
    $scope.logindetails = {};
    $scope.loginError = '';
    
    $scope.credentials = {
      email: '',
      password: ''
    };
    
//     $scope.user.email = '';
//     $scope.user.password = '';
    
    $scope.login = function(credentials) {
//       if($scope.myForm.$valid) {
//         var loggedIn = Auth.login({email: credentials.email, password: credentials.password});
//         loggedIn.then(function () {
//           $location.path('/login');  
//         }, function () {
//           $scope.loginError = "Invalid email/password";
//           console.log('Could not login for some reason - should display the message somewhere');
//         });
//       }
      Auth.login(credentials).then(function () {
        // My success code here
        //$location.path('/login');
         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function () {
        // My fail code here
        //$scope.loginError = 'Invalid email/password';
         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  
		$scope.logout = function() {
      Auth.logout();
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $location.path('/');
//       $scope.$apply();
		};
  
// 		$scope.signedIn = function() {
// 			return Auth.signedIn();
// 		};
  
// 		$scope.signedInAs = function() {
// 			return Auth.signedInAs();
// 		};
  
    $scope.register = function() {
      Auth.register($scope.user);     
      Auth.login({email: $scope.user.remail,
      password: $scope.user.rpassword
    });
//       $location.path('/');
		};
	}]);
