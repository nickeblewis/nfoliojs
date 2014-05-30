'use strict';

angular.module('farnboroughyoApp')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'statuspost.html',
				'<li class="feed-item-add">' +
				'<form class="form-inline" role="form" name="myForm">' +
    				'<div class="form-group">' +
							'<input type="text" class="form-control" id="inputStatus" placeholder="add a status post" ng-model="post">' +
						'</div>' +
    				'<div class="form-group">' +
							'<button ng-click="postStatus(place.$id)"class="btn btn-primary">Post</button>' +
    				'</div>' +
					'</form>' +
				'</li>'
			);
		}
	])

	.controller('StatuspostCtrl', function ($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH, fbURL, Auth) {
		$scope.postStatus = function(placeId) {
			var messageListRef = new Firebase(fbURL + placeId + '/feed');
			var newMessageRef = messageListRef.push();          
			newMessageRef.set({
				'message': $scope.post,
				'updated': (new Date()).getTime()
			});			
// 			$scope.postsuccess = true;
		};
  })

  .directive('statuspost', function () {
    return {
      templateUrl: 'statuspost.html',
      restrict: 'EA',
			replace: true,
			scope: {
      	place: '='
     },
			controller: 'StatuspostCtrl'
    };
  });
