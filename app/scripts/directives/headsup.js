'use strict';

angular.module('nfolio')
  .directive('headsup', function () {
    return {
      template: '<div class="col-md-12 card">TEST</div>',
      restrict: 'EA',
      replace: true
    };
  });
