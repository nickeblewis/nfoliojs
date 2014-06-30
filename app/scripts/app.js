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
//     $rootScope.$on('$routeChangeStart', function (event, next) {
//       if(next.data) {
//         var authorizedRoles = next.data.authorizedRoles;
//         if (!Auth.isAuthorized(authorizedRoles)) {
//           event.preventDefault();
//           if (Auth.isAuthenticated()) {
//             // user is not allowed
//             $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//           } else {
//             // user is not logged in
//             $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
//           }
//         }
//       }
//     });
//     $rootScope.$on('$locationChangeStart', function (event, next) {
//       if (!Auth.isAuthenticated()) {
//         event.preventDefault();
//         return;
//       }
//     });
  })
  .constant('FIREBASE_URL', 'https://nfolio.firebaseio.com/')
  .config(function ($routeProvider, USER_ROLES) {

    
    $routeProvider
// NOTE: This totally broke the routing and had me puzzled for 3 days!!!
//     .when('/:id', {
//         templateUrl: 'views/main.html',
//         controller: 'MainCtrl',
//         data: {
//           authorizedRoles: [USER_ROLES.all]
//         }
//       })
    
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
//      .when('/', {
//         templateUrl: 'views/posts.html',
//         controller: 'PostsCtrl'
//       })
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
//       .when('/login', {
//         templateUrl: 'views/login.html',
//         controller: 'LoginCtrl'
//       })
    .when('/login', {
  templateUrl: 'views/login.html',
  controller: 'AuthCtrl'
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
      .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })
   .when('/register', {
  templateUrl: 'views/register.html',
  controller: 'AuthCtrl'
})
      .otherwise({
        redirectTo: '/'
      });
  });
