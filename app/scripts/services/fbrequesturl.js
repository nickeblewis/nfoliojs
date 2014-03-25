'use strict';
/*global Firebase*/
/*global FirebaseSimpleLogin*/
angular.module('farnboroughyoApp')
  .factory('fbRequestUrl', function ($firebase, fbURL, fbAuthToken) {
    var ref = new Firebase(fbURL);
    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
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
  });
