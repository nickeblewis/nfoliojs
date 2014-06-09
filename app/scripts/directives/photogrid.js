'use strict';

angular.module('nfolio')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'photogrid.html',
        '<div class="row">' +
				'<div id="isotopeContainer" isotope-container  ng-cloak class="ng-cloak">' +
  '<div isotope-item class="isotope-item no-transition" ng-repeat="(name, item) in places | orderBy:\'updated\':reverse=false" ng-show="{{item.fileThumb != undefined}}">' +
        '<div ng-show="{{item.fileThumb != undefined}}"><img src="https://s3-eu-west-1.amazonaws.com/nfolio/{{item.fileThumb}}" /></div>' +
        '<strong><a data-ng-href="#/show/{{name}}">{{item.name}}</a></strong> <i>Updated {{timeAgo(item.updated)}}</i>' +
//       '<div class="card-content">' +
//         '{{item.description || "empty"}}' +
//       '</div>' +
//       '<div class="card-content">' +
//         '{{item.description || "empty"}}' +
// // 				'<div ng-transclude></div>' +
//       '</div>' +
  '</div>' +
'</div></div>'
			);
		}
	])

  .directive('photogrid', function () {
    return {
      templateUrl: 'photogrid.html',
      restrict: 'EA',
			replace: true,
			transclude: true
    };
  });
