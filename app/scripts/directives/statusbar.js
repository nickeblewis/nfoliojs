'use strict';

angular.module('nfolio')
  .run(['$templateCache',
  function ($templateCache) {
      $templateCache.put(
        'statusbar.html',
        '<div class="col-md-12 card">' +
          '<div class="status-bar"><strong><a href="#/show/{{statusref}}">{{status}}</a></strong></div>' +
        '</div>'
);
}
])
      
  .directive('statusbar', [function () {
    return {
      templateUrl: 'statusbar.html',
      restrict: 'EA',
      replace: false,
      controller: ['$scope', function ($scope)
      {                   
        $scope.test = 3;
      }]
    }
  }]);


