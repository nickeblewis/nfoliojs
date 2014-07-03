// TODO: Can be removed later
'use strict';
/*global Firebase*/
angular.module('nfolio')
  .controller('ShowCtrl', ['$rootScope','$scope', '$location', '$routeParams', '$firebase', 'fbURL', 'Auth', function ($rootScope, $scope, $location, $routeParams, $firebase, fbURL, Auth) {
    var placeUrl = fbURL + $routeParams.placeId;
    
    $scope.place = $firebase(new Firebase(placeUrl));
    $scope.placeId = $routeParams.placeId;
    $scope.postsuccess = false;
    $scope.status = '';
        
    $scope.postComment = function(comment) {
      var count = 0;
      $scope.place.updated = (new Date()).getTime();
      
      // Move this to a function getCount(ref) and put in come
      var table = new Firebase(fbURL + $scope.placeId + '/feed');
      table.on('value', function(snapshot) {
   
        snapshot.forEach(function() {
          count++;
        });
      });
        
      $scope.place.commentcount = parseInt(count) + 1;
      $scope.place.$save();
      
      var messageListRef = new Firebase(fbURL + $scope.placeId + '/feed');
      var newMessageRef = messageListRef.push();          
      
      newMessageRef.set({
        'message': comment,
        'updated': (new Date()).getTime(),
        'userid': $scope.currentUser
      });
      $scope.status = '';
    };
  }]);
