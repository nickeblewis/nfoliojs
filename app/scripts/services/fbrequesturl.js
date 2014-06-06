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

  .factory('Auth', function ($firebase, $rootScope, fbAUTH, fbProfilesURL) {
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
			register: function (newuser) {
        auth.createUser(newuser.email, newuser.password, function(error,user) {
          console.log('New user ' + user.id + ' was created');
          var messageListRef = new Firebase(fbProfilesURL);
          var newMessageRef = messageListRef.push();
          newMessageRef.set({
            'email': newuser.email,
            'name': newuser.name,
            'userid': user.id
          });
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
  });
