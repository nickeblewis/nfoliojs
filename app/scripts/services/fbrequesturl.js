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
    this.create = function (userId, userEmail, userRole, userName) {
      this.userId = userId;
      this.userEmail = userEmail;
      this.userRole = userRole;
      this.userName = userName;
    };
    this.destroy = function () {
      this.userId = null;
      this.userEmail = null;
      this.userRole = null;
      this.userName = null;
    };
    return this;
  })

  .factory('Auth', function ($firebase, $rootScope, fbAUTH, Session, fbProfilesURL, $q, AUTH_EVENTS, USER_ROLES) {
    var ref = new Firebase(fbAUTH);
    var auth = FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
         console.log(error);
      } else if (user) {
        Session.create(user.id,user.email,USER_ROLES.guest);
      } else {
        Session.destroy();
      }
    });

    return {
      register: function (newuser) {
        auth.createUser(newuser.remail, newuser.rpassword, function(error,user) {
          var messageListRef = new Firebase(fbProfilesURL);
          var newMessageRef = messageListRef.push();
          newMessageRef.setWithPriority({
            'email': newuser.remail,
            'name': newuser.rname,
            'userid': user.id
          }, user.id);
        });
      },
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
        var deferred = $q.defer();
        auth.login('password', {email: user.email, password: user.password, rememberMe: true}).then(function(user) {
          console.log('Logged in');
          deferred.resolve(user);
        }, function(error) { 
          console.error('Login failed: ', error);
          deferred.reject(error);
        });
        return deferred.promise;
      },
      logout: function () {
        auth.logout();
      }
    };
  });
