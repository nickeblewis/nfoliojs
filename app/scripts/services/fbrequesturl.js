'use strict';
/*global Firebase*/
/*global FirebaseSimpleLogin*/
angular.module('farnboroughyoApp')
  .factory('fbRequestUrl', function ($firebase, fbURL) {
    var ref = new Firebase(fbURL);
    new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        // You are logged in
        console.log('factory User ID: ' + user.id + ', Provider: ' + user.provider);
        //isAuthorised = true;
      } else {
        // User has logged out
        console.log('factory User has logged out');
      }
    });

    return $firebase(ref);
  })

  .factory('Auth', function ($firebase, $rootScope, fbAUTH) {
    var ref = new Firebase(fbAUTH);
    var auth = FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        // You are logged in
        console.log('factory User ID: ' + user.id + ', Provider: ' + user.provider);
				$rootScope.signedIn = true;
        $rootScope.signedInAs = user;
      } else {
        // User has logged out
        console.log('factory User has logged out');
        $rootScope.signedIn = false;
      }
    });
		var Auth = {
			register: function (user) {
        auth.createUser(user.email, user.password, function(error,user) {
          console.log('New user ' + user.id + ' was created');
        });
      },
      signedIn: function () {
        return $rootScope.signedIn;
      },
      signedInAs: function() {
        return $rootScope.signedInAs;
      },
      login: function (user) {
				$rootScope.signedIn = true;
        return auth.login('password', user);
      },
      logout: function () {
        auth.logout();
        $rootScope.signedIn = false;
				return $rootScope.signedIn;
      }
		};
    
		return Auth;
    //return $firebase(ref);
  });
