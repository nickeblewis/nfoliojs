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

  .factory('Auth', function ($firebase, $rootScope, fbAUTH, fbProfilesURL, $q) {
    var ref = new Firebase(fbAUTH);
    var auth = FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error ocurred during login
         console.log(error);
        $rootScope.signedIn = false;
//         $rootScope.signedInAs = null;
      } else if (user) {
        // You are logged in
//         console.log('factory User ID: ' + user.id + ', Provider: ' + user.provider);
        $rootScope.signedIn = true;
        $rootScope.signedInAs = user.id;
      } else {
        // User has logged out
        
        $rootScope.signedIn = false;
//         $rootScope.signedInAs = null;
        
        console.log('factory User has logged out ');
      }
    });
		var Auth = {
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
      
      signedIn: function () {
        return $rootScope.signedIn;
        
      },
      
      signedInAs: function() {
        return $rootScope.signedInAs;
      },
      
      login: function (user) {
// 				$rootScope.signedIn = true;
        var deferred = $q.defer();
        auth.login('password', {email: user.email, password: user.password}).then(function(user) {
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
    
		return Auth;
  });
