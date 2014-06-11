'use strict';
/*global Firebase*/
angular.module('nfolio')
  .controller('ShowCtrl', ['$rootScope','$scope', '$location', '$routeParams', '$firebase', 'fbURL', 'Auth', function ($rootScope, $scope, $location, $routeParams, $firebase, fbURL, Auth) {
    var placeUrl = fbURL + $routeParams.placeId;
    
    $scope.place = $firebase(new Firebase(placeUrl));
    $scope.placeId = $routeParams.placeId;
    $scope.postsuccess = false;
    $scope.status = '';
    
//     $scope.signedIn = function() {
//       return Auth.signedIn();
//     };
    
//     $scope.signedInAs = function() {
//       return $rootScope.signedInAs;
//     };
    
    $scope.postComment = function(comment) {
      $scope.place.updated = (new Date()).getTime();
      $scope.place.$save();
      var messageListRef = new Firebase(fbURL + $scope.placeId + '/feed');
      var newMessageRef = messageListRef.push();          
      newMessageRef.set({
        'message': comment,
        'updated': (new Date()).getTime(),
        'userid': $scope.currentUser
      });
//       $scope.postsuccess = true;
      $scope.status = '';
    };
  }]);
