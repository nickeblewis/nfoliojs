'use strict';
/*global Firebase*/
angular.module('nfolio')
  .controller('ShowCtrl', ['$scope', '$location', '$routeParams', '$firebase', 'fbURL', 'Auth', function ($scope, $location, $routeParams, $firebase, fbURL, Auth) {
    var placeUrl = fbURL + $routeParams.placeId;
    
    $scope.place = $firebase(new Firebase(placeUrl));
    $scope.placeId = $routeParams.placeId;
    $scope.postsuccess = false;
    $scope.signedIn = function() {
      return Auth.signedIn();
    };
    
    $scope.signedInAs = function() {
      return Auth.signedInAs();
    };
    
    $scope.postComment = function() {
      $scope.place.updated = (new Date()).getTime();
      $scope.place.$save();
      var messageListRef = new Firebase(fbURL + $scope.placeId + '/feed');
      var newMessageRef = messageListRef.push();          
      newMessageRef.set({
        'message': $scope.status,
        'updated': (new Date()).getTime(),
        'userid': $scope.signedInAs().id
      });
      $scope.postsuccess = true;
    };
  }]);
