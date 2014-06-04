'use strict';

angular.module('nfolio')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'feedlist.html',
				'<ul class="feed-list list-group" ng-show="place.feed">' +
// 				'	<li class="feed-item-post list-group-item" class="animate" ng-repeat="item in place.feed | orderByPriority | orderBy:\'updated\':reverse=true | limitTo: {{limit}}">' +
        '	<li class="feed-item-post list-group-item" class="animate" ng-repeat="item in place.feed | orderByPriority | orderBy:\'updated\':reverse=true | limitTo:5">' +
						'<span class="badge">{{timeAgo(item.updated)}}</span>' +
						'<i class="glyphicon glyphicon-user"></i> {{item.message}}' +
					'</li>' +
					'<div ng-transclude></div>' +
				'</ul>'
			);
		}
	])

  .directive('feedlist', function () {
    return {
      templateUrl: 'feedlist.html',
      restrict: 'EA',
			replace: true,
			transclude: true
    };
  });
