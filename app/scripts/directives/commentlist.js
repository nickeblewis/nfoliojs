'use strict';

angular.module('nfolio')
  // Cached templates for directives
  .run(['$templateCache',
    function ($templateCache) {
      $templateCache.put(
        'commentlist.html',
        '<ul class="feed-list list-group">' +
        '<li class="feed-item-post list-group-item" class="animate" ng-repeat="item in place.feed | orderByPriority | orderBy:\'updated\':reverse=true">' +
//         '<span ng-if="currentUser == item.userid" class="badge" ng-click="deleteComment(name)">Delete</span>' +
        '<span class="badge">{{item.username}}{{item.userid}}</span><span class="badge">{{timeAgo(item.updated)}}</span>' +
        '<i class="glyphicon glyphicon-user"></i> {{item.message}}' +
        '</li>' +
        '<div ng-transclude></div>' +
        '</ul>'
      );
    }
  ])

  .controller('CommentListCtrl', ['$scope', '$timeout', 'fbRequestUrl', 'fbProfilesURL', 'fbEvents', 'fbAUTH', 'Auth', 'fbURL', function ($scope, $timeout, fbRequestUrl, fbProfilesURL, fbEvents, fbAUTH, Auth, fbURL) {        
    $scope.signedIn = function() {
      return $scope.currentUser;
    };   
    $scope.deleteComment = function (index) {
      alert(index);
    };
    $scope.timeAgo = function(ms) {
      return moment(ms).fromNow();
    };
    $scope.getUser = function (id) {
      new Firebase(fbProfilesURL)
        .startAt(id)
      .endAt(id)
      .once('value', function (dataSnapshot) {
        return dataSnapshot.val().name;
      });
      
    };
    
  }])

  .directive('commentlist', function () {
    return {
      templateUrl: 'commentlist.html',
      controller: 'CommentListCtrl',
      restrict: 'EA',
      scope: '=',
      replace: true,
      transclude: true
    };
  });
