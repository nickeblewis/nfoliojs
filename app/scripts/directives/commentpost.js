'use strict';

angular.module('nfolio')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'commentpost.html',
				'<li class="feed-item-add">' +
				'<form class="form-inline" role="form" name="myForm">' +
    				'<div class="form-group">' +
							'<input type="text" class="form-control" id="inputStatus" placeholder="add a comment" ng-model="post">' +
						'</div>' +
    				'<div class="form-group">' +
							'<button ng-click="postComment(place.$id)"class="btn btn-primary">Post</button>' +
    				'</div>' +
					'</form>' +
				'</li>'
			);
		}
	])

	.controller('CommentpostCtrl', ['$scope', '$timeout', 'fbRequestUrl', 'fbEvents', 'fbAUTH', 'fbURL', 'Auth', function ($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH, fbURL, Auth) {
		$scope.signedInAs = function() {
			return Auth.signedInAs();
		};
    $scope.postComment = function(photoId) {
			var messageListRef = new Firebase(fbURL + photoId + '/feed');
			var newMessageRef = messageListRef.push();          
			newMessageRef.set({
				'message': $scope.post,
				'updated': (new Date()).getTime(),
        'userid': $scope.signedInAs().id
			});			
// 			$scope.postsuccess = true;
		};
  }])

  .directive('commentpost', function () {
    return {
      templateUrl: 'commentpost.html',
      restrict: 'EA',
			replace: true,
			scope: {
      	place: '='
     },
			controller: 'CommentpostCtrl'
    };
  });
