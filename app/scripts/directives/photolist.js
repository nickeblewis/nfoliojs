'use strict';

angular.module('nfolio')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'photolist.html',
        '<div class="row main">' +
				
  '<div ng-show="loaded" class="col-md-12 card" ng-repeat="place in places | orderByPriority | orderBy:\'updated\':reverse=true">' +
        '<p ng-show="{{place.fileThumb != undefined}}"><img width="100%" src="http://placehold.it/700x50&text=Uploading..." /></p>' +
        '<p ng-show="{{place.fileThumb == undefined}}"><img width="100%" src="https://s3-eu-west-1.amazonaws.com/nfolio/{{place.fileMedium}}" /></p>' +
//         '<p><img ng-show="{{place.fileThumb != undefined}}" src="http://placehold.it/700x100&text=Image Uploading" /></p>' +
//         '<p><img ng-show="{{place.fileThumb}}" ng-src="https://s3-eu-west-1.amazonaws.com/nfolio/{{place.fileThumb}}" /></p>' +
        '<strong><span class="badge">{{place.userid}}</span> <a data-ng-href="#/show/{{place.$id}}">{{place.name}}</a></strong> <i>Updated {{timeAgo(place.updated)}}</i>' +
      '<p class="card-content">' +
        '{{place.description || "empty"}}' +
				'<div ng-transclude></div>' +
      '</p>' +
  '</div>' +
'</div>'
			);
		}
	])

  .directive('photolist', function () {
    return {
      templateUrl: 'photolist.html',
      restrict: 'EA',
			replace: true,
			transclude: true,
      controller: ['$scope', function ($scope)
      {                   
        $scope.test = 3;                   
      }]
    };
  });
