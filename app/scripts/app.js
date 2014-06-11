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
  .run(function ($rootScope, AUTH_EVENTS, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if(next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!Auth.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (Auth.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      }
    });
  })
  
  .config(function ($routeProvider,USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
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
        // templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/create', {
        templateUrl: 'views/edit.html',
        controller: 'CreateCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/folio', {
        templateUrl: 'views/folio.html',
        controller: 'FolioCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/discussion', {
        templateUrl: 'views/discussion.html',
        controller: 'DiscussionCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .otherwise({
        redirectTo: '/',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      });
  });
