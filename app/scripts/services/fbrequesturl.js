'use strict';
/*global Firebase*/
/*global FirebaseSimpleLogin*/
angular.module('nfolio')

  .factory('fbRequestUrl', function ($firebase, fbURL) {
    var ref = new Firebase(fbURL);
    return $firebase(ref);
  })

  .factory('fbMessagesUrl', function ($firebase, fbMessagesURL) {
    var ref = new Firebase(fbMessagesURL);
    return $firebase(ref);
  })

  .factory('fbProfilesUrl', function ($firebase, fbProfilesURL) {
    var ref = new Firebase(fbProfilesURL);
    return $firebase(ref);
  })
  
  .service('Session', function () {
    this.create = function (userId, userEmail, userRole) {
      this.userId = userId;
      this.userEmail = userEmail;
      this.userRole = userRole;
    };
    this.destroy = function () {
      this.userId = null;
      this.userEmail = null;
      this.userRole = null;
    };
    return this;
  })

  .factory('Auth', function ($firebase, $rootScope, fbAUTH, Session, fbProfilesURL, $q, AUTH_EVENTS, USER_ROLES) {
    var ref = new Firebase(fbAUTH);
    var auth = FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error ocurred during login
         console.log(error);
//         $rootScope.signedIn = false;
        
//         $rootScope.signedInAs = null;
      } else if (user) {
        // You are logged in
//         console.log('factory User ID: ' + user.id + ', Provider: ' + user.provider);
//         $rootScope.signedIn = true;
//         $rootScope.signedInAs = user.id;
        Session.create(user.id,user.email,USER_ROLES.guest);
      } else {
        // User has logged out
        
//         $rootScope.signedIn = false;
//         $rootScope.signedInAs = null;
        Session.destroy();
        
//         console.log('factory User has logged out ');
      }
    });
		
    return {
			register: function (newuser) {
        auth.createUser(newuser.remail, newuser.rpassword, function(error,user) {
//           console.log('New user ' + user.id + ' was created');
          var messageListRef = new Firebase(fbProfilesURL);
          var newMessageRef = messageListRef.push();
          newMessageRef.set({
            'email': newuser.remail,
            'name': newuser.rname,
            'userid': user.id
          });
//           $rootScope.signedIn = true;
//         return auth.login('password', newuser);
        });
      },
      
//       signedIn: function () {
//         return $rootScope.signedIn;
        
//       },
      
//       signedInAs: function() {
//         return $rootScope.signedInAs;
//       },
      
      isAuthenticated: function () {
        return !!Session.userId;  
      },
      
      isAuthorized: function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        } 
        return (this.isAuthenticated() &&
          authorizedRoles.indexOf(Session.userRole) !== -1);
        
      },
      
      login: function (user) {
// 				$rootScope.signedIn = true;
        var deferred = $q.defer();
        auth.login('password', {email: user.email, password: user.password, rememberMe: true}).then(function(user) {
          console.log('Logged in');
          deferred.resolve(user);
        }, function(error) { 
          console.error('Login failed: ', error);
          deferred.reject(error);
          //return false;
        });
        
        return deferred.promise;
      },
      
      logout: function () {
        
          
        auth.logout();
        
//         $rootScope.signedIn = false;
// 				return $rootScope.signedIn;
      }
		};
    
// 		return Auth;
  });
