'use strict';
/*global Firebase*/
angular.module('farnboroughyoApp')
  .controller('ShowCtrl', function ($scope, $location, $routeParams, $firebase, fbURL, Auth) {
    
		var placeUrl = fbURL + $routeParams.placeId;
    
		$scope.place = $firebase(new Firebase(placeUrl));
		
		$scope.placeId = $routeParams.placeId;
		
		$scope.postsuccess = false;
		
		$scope.postStatus = function() {
			$scope.place.updated = (new Date()).getTime();
      $scope.place.$save();
			var messageListRef = new Firebase(fbURL + $scope.placeId + '/feed');
			var newMessageRef = messageListRef.push();          
			newMessageRef.set({
				'message': $scope.status,
				'updated': (new Date()).getTime()
			});			
			$scope.postsuccess = true;
		};
		
  });
