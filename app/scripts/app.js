'use strict';

angular.module('nfolio', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
//   'ngAnimate',
//   'iso.directives',
  'firebase',
  'angularFileUpload'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/show/:placeId', {
        templateUrl: 'views/show.html',
        controller: 'ShowCtrl'
        // controller: 'ShowCtrl'
      })
      .when('/edit/:placeId', {
        templateUrl: 'views/edit.html',
        // templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .when('/create', {
        templateUrl: 'views/edit.html',
        controller: 'CreateCtrl',
        resolve: {
          factory: checkSignedIn
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var checkSignedIn = function ($q, $rootScope, $location, Auth, $http) {
    if (Auth.signedIn()) {
        return true;
    } else {
        var deferred = $q.defer();
        $http.post("/login")
            .success(function (response) {
                //$rootScope.userProfile = response.userProfile;
                deferred.resolve(true);
            })
            .error(function () {
                deferred.reject();
                $location.path("/");
             });
        return deferred.promise;
    }
};
