'use strict';

angular.module('farnboroughyoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  // 'ngAnimate',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/show/:placeId', {
        templateUrl: 'views/show.html',
        controller: 'EditCtrl'
        // controller: 'ShowCtrl'
      })
      .when('/edit/:placeId', {
        templateUrl: 'views/show.html',
        // templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
