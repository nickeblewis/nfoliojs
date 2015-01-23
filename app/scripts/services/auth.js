'use strict';
angular.module('nfolio')
.factory('Auth',
  function ($firebaseAuth, FIREBASE_URL, $rootScope) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    var Auth = {
      getAuth: function () {
        return auth.$getAuth();
      },
      register: function (user) {
        return auth.$createUser(user).then(function(authData){
          console.log("Success");
          // User.create(authData,user.username);
        }).catch(function(err){
          console.log("Error");
        });
      },
      login: function (user) {
        return auth.$authWithPassword(user).then(function(authData){
          console.log(authData);
        }).catch(function(err){
          console.log(err);
        });
      },
      loginWithOAuth: function () {
        return auth.$authWithOAuthRedirect('google').then(function(authData){
          console.log(authData);
        }).catch(function(err){
          console.log(err);
        });
      },
      logout: function () {
        auth.$unauth();
      }
    };

    return Auth;
  });
