'use strict';

angular.module('nfolio', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
//'ngAnimate',
//'iso.directives',
  'firebase'
//'angularFileUpload'
])

  .constant('FIREBASE_URL', 'https://nfolio.firebaseio.com/')
  .config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl'
      // })
      // .when('/', {
      // templateUrl: 'views/posts.html',
      // controller: 'PostsCtrl'
      // })
      .when('/', {
        templateUrl: 'views/photos.html',
        controller: 'PhotoCtrl'
      })
      .when('/show/:placeId', {
        templateUrl: 'views/show.html',
        controller: 'ShowCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/edit/:placeId', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/users/:username', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      //   .when('/test', {
      //     templateUrl: 'views/test.html',
      //     controller: 'TestCtrl',
      //     data: {
      //       authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
      //     }
      //   })
      .when('/create', {
        templateUrl: 'views/edit.html',
        controller: 'PhotoCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      //       .when('/login', {
      //         templateUrl: 'views/login.html',
      //         controller: 'LoginCtrl'
      //       })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/photos/:photoId', {
        templateUrl: 'views/showphoto.html',
        controller: 'PhotoViewCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
