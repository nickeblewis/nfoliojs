'use strict';

$.cloudinary.config().cloud_name = 'dqpknoetx';
$.cloudinary.config().upload_preset = 'gec3tjz3';

angular.module('nfolio', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  //    'ngAnimate',
  //   'iso.directives',
  'firebase',
  'cloudinary'
])

.constant('FIREBASE_URL', 'https://nfolio.firebaseio.com/')
  .config(function($routeProvider, $locationProvider) {
    //    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/photos.html',
        controller: 'PhotoCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/photosUpload.html',
        controller: 'PhotoUploadCtrl'
      })
      .when('/users/:username', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/u/:username', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
    //   .when('/create', {
    //     templateUrl: 'views/create.html',
    //     controller: 'PhotoCtrl'
    //   })
    //   .when('/edit/:photoId', {
    //     templateUrl: 'views/edit.html',
    //     controller: 'PhotoEditCtrl'
    //   })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
      .when('/photos/:photoId', {
        templateUrl: 'views/showphoto.html',
        controller: 'PhotoViewCtrl'
      })
    // TODO: A later feature.... for example tags/madrid, tags/airshow
    //   .when('/tags/:tagId', {
    //     templateUrl: 'views/photos.html',
    //     controller: 'PhotoCtrl'
    //   })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
