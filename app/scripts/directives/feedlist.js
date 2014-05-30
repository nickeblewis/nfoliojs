'use strict';

angular.module('farnboroughyoApp')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'feedlist.html',
				'<ul class="feed-list" ng-show="place.feed">' +
				'<li class="feed-item-post" class="animate" ng-repeat="item in place.feed | orderByPriority | orderBy:\'updated\':reverse=true"><i class="glyphicon glyphicon-user"></i> {{item.message}}</li>' +
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
