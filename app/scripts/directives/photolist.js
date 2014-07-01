'use strict';

angular.module('nfolio')
  .run(['$templateCache',
    function ($templateCache) {
      $templateCache.put(
        'photolist.html',
        '<div class="row main">' +
          '<div ng-show="loaded" class="col-md-12 card" ng-repeat="place in places | orderByPriority | orderBy:\'updated\':reverse=true" | limitTo:5>' +
            '<p ng-show="{{place.fileMedium != undefined}}">' +
              '<img width="100%" src="https://s3-eu-west-1.amazonaws.com/nfolio/{{place.fileMediumZZ}}" />' +
            '</p>' +
            '<p ng-show="{{place.fileMedium == undefined}}" class="alert alert-info">' +
              'Your image files are currently being generated, they will appear here shortly...' +
            '</p>' +
            '<strong><span class="badge">{{place.userid}}</span> <a data-ng-href="#/show/{{place.$id}}">{{place.name}}</a></strong> <i>Updated {{timeAgo(place.updated)}}</i>' +
              '<p class="card-content">' +
                '{{place.description || "empty"}}' +
                '<div ng-transclude></div>' +
              '</p>' +
              '<p><span class="badge">{{place.commentcount}} comments</span></p>' +
            '</div>'
//         '<div class="row main">' +
//           '<div ng-show="loaded" class="col-md-12 card" ng-repeat="place in places | orderByPriority | orderBy:\'updated\':reverse=true" ng-if="$first">' +
//             '<p ng-show="{{place.fileMedium != undefined}}">' + 
//               '<img width="100%" src="https://s3-eu-west-1.amazonaws.com/nfolio/{{place.fileMedium}}" /></p>' +
//               '<strong><span class="badge">{{place.userid}}</span> <a data-ng-href="#/show/{{place.$id}}">{{place.name}}</a></strong> <i>Updated {{timeAgo(place.updated)}}</i>' +
//               '<p class="card-content">' +
//                 '{{place.description || "empty"}}' +
//                 '<div ng-transclude></div>' +
//               '</p>' +
//             '</div>' +
//         '<div ng-show="loaded" class="col-md-6 card" ng-repeat="place in places | orderByPriority | orderBy:\'updated\':reverse=true" ng-if="!$first">' +
//         '<div ng-show="{{place.fileThumb != undefined}}">' + 
//               '<img src="https://s3-eu-west-1.amazonaws.com/nfolio/{{place.fileThumb}}" /></div>' +
// //         '<img width="100%" src="http://placehold.it/332" /></p>' +
//               '<strong><span class="badge">{{place.userid}}</span> <a data-ng-href="#/show/{{place.$id}}">{{place.name}}</a></strong> <i>Updated {{timeAgo(place.updated)}}</i>' +
              
//         '</div>' +
//         '</div>'
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
