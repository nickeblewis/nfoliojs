'use strict';

angular.module('nfolio')
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'headernav.html',
				'<div class="header">' +
  				'<ul class="nav nav-pills pull-right">' +
    				'<li><a ng-href="#/create" ng-show="signedIn()">Upload</a></li>' +
    				'<li><a ng-href="#/login" ng-show="!signedIn()">Login/Register</a></li>' +
						'<li><a ng-href="#/login" ng-show="signedIn()">Profile</a></li>' +
  				'</ul>' +
  				'<h3 class="text-muted"><a ng-href="/">Nfolio</a></h3>' +
				'</div>'
			);
		}
	])

  .directive('headernav', [function () {
    return {
      templateUrl: 'headernav.html',
      restrict: 'EA',
			replace: true,
			controller: ['$scope', 'Auth', function ($scope, Auth) {
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
      }]
    }
  }]);
