'use strict';

angular.module('farnboroughyoApp')
  .controller('StatusPostCtrl', function ($scope) {
    $scope.postStatus = function(placeId) {
			var messageListRef = new Firebase(fbURL + placeId + '/feed');
			var newMessageRef = messageListRef.push();          
			newMessageRef.set({
				'message': $scope.status,
				'updated': (new Date()).getTime()
			});			
// 			$scope.postsuccess = true;
		};
  });
