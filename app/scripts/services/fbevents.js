'use strict';
/*global Firebase*/
angular.module('nfolio')
  .factory('fbEvents', function ($firebase, fbURL, fbAuthToken) {
    var firebase = new Firebase(fbURL);
    firebase.auth(fbAuthToken);
    return firebase;
  });
