'use strict';

angular.module('nfolio')
  .run(['$templateCache',
    function ($templateCache) {
      $templateCache.put(
        'messagelist.html',
        '<div class="row main">' +
        '<div ng-show="loaded" class="col-md-12 card" ng-repeat="msg in messages">' +
        '<p>{{msg.text}}</p>' +
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
        $scope.test = 3;                   
      }]
    };
  });
