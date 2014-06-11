'use strict';

angular.module('nfolio')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'footernav.html',
				'<div class="footer">' +
  				'<p>The Nfolio team</p>' +
				'</div>'
			);
		}
	])

  .directive('footernav', function () {
    return {
      templateUrl: 'footernav.html',
      restrict: 'EA',
			replace: true,
      controller: ['$scope', function ($scope)
      {                   
        $scope.test = 3;                   
      }]
    };
  });
