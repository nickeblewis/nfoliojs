'use strict';

angular.module('nfolio')
  // Cached templates for directives
  .run(['$templateCache',
    function ($templateCache) {
      $templateCache.put(
        'commentlist.html',
        '<ul class="feed-list list-group">' +
        '<li class="feed-item-post list-group-item" class="animate" ng-repeat="item in place.feed | orderByPriority | orderBy:\'updated\':reverse=true | limitTo:5">' +
        '<span class="badge">{{item.userid}}</span><span class="badge">{{timeAgo(item.updated)}}</span>' +
        '<i class="glyphicon glyphicon-user"></i> {{item.message}}' +
        '</li>' +
        '<div ng-transclude></div>' +
        '</ul>'
      );
    }
  ])

  .controller('CommentListCtrl', ['$scope', '$timeout', 'fbRequestUrl', 'fbEvents', 'fbAUTH', 'Auth', function ($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH, Auth) {        
    $scope.signedIn = function() {
      return $scope.currentUser;
    };        
  }])

  .directive('commentlist', function () {
    return {
      templateUrl: 'commentlist.html',
      controller: 'CommentListCtrl',
      restrict: 'EA',
      replace: true,
      transclude: true
    };
  });
