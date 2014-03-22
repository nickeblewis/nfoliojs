'use strict';

angular.module('farnboroughyoApp')
  .factory('fbEvents', function ($firebase, fbURL, fbAuthToken) {
    var firebase = new Firebase(fbURL);
    firebase.auth(fbAuthToken);
    return firebase;
  });
