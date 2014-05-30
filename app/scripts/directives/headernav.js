'use strict';

angular.module('farnboroughyoApp')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'headernav.html',
				'<div class="header">' +
  				'<ul class="nav nav-pills pull-right">' +
    				'<li><a ng-href="#/create" ng-show="signedIn()">Create</a></li>' +
    				'<li><a ng-href="#/login" ng-show="!signedIn()">Login</a></li>' +
						'<li><a ng-click="logOut()" ng-show="signedIn()">Logout</a></li>' +
  				'</ul>' +
  				'<h3 class="text-muted"><a ng-href="/">FG</a></h3>' +
				'</div>'
			);
		}
	])

	.controller('HeaderNavCtrl', function ($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH, Auth) {
    $scope.logIn = function() {
      $scope.isAuthorised = true;
      $scope.authmessage = 'You have successfully logged in';
    };
    
    $scope.signedIn = function() {
      return Auth.signedIn();
    };
    
    $scope.logOut = function() {
      return Auth.logout();
    };
  })

  .directive('headernav', function () {
    return {
      templateUrl: 'headernav.html',
      restrict: 'EA',
			replace: true,
			controller: 'HeaderNavCtrl'
    };
  });
