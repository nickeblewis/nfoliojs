'use strict';

angular.module('nfolio')
	// Cached templates for directives
	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'footernav.html',
				'<div class="footer">' +
  				'<p>♥ from the FG team</p>' +
				'</div>'
			);
		}
	])

  .directive('footernav', function () {
    return {
      templateUrl: 'footernav.html',
      restrict: 'EA',
			replace: true
    };
  });
