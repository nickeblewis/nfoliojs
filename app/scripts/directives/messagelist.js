'use strict';

angular.module('nfolio')
  .run(['$templateCache',
    function ($templateCache) {
      $templateCache.put(
        'messagelist.html',
        '<div class="row main">' +
        '<div class="col-md-12 card" ng-repeat="msg in messages">' +
        '<p ng-show="messageValidToday(msg.starts, msg.ends)">{{msg.text}}</p>' +
        '</div>' +
        '</div>'
      );
    }
  ])

  .directive('messagelist', function () {
    return {
      templateUrl: 'messagelist.html',
      restrict: 'EA',
      replace: true,
      controller: ['$scope', function ($scope)
      {                           
        $scope.messageValidToday = function(start, end) {
          // TODO: Should check whether the epoch for today is in between start and end          
          return true;
        };        
      }]
    };
  });
