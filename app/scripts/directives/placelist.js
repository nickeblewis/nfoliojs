'use strict';

angular.module('farnboroughyoApp')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'placelist.html',
				'<div class="row main">' +
  '<div ng-show="loaded" class="animate-repeat col-md-12 card" ng-repeat="place in places | orderByPriority | filter:search | orderBy:\'updated\':reverse=true">' +
    '<strong><a data-ng-href="#/show/{{place.$id}}">{{place.name}}</a></strong> <i>Updated {{timeAgo(place.updated)}}</i>' +
      '<p class="card-content" ng-show="isAuthorised" editable-textarea="place.description" e-cols="17" e-rows="6" e-style="width: 100%; font-size: 14px;" onaftersave="save()">' +
        '{{place.description || "empty"}}' +
      '</p>' +
      '<p class="card-content" ng-show="!isAuthorised">' +
        '{{place.description || "empty"}}' +
				'<div ng-transclude></div>' +
      '</p>' +
  '</div>' +
'</div>'
			);
		}
	])

  .directive('placelist', function () {
    return {
      templateUrl: 'placelist.html',
      restrict: 'EA',
			replace: true,
			transclude: true
    };
  });
