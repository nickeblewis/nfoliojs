'use strict';

angular.module('farnboroughyoApp')
  .directive('statusbar', function () {
    return {
      template: '<div class="col-md-12 card"><div class="status-bar"><strong>{{status}}</strong></div></div>',
      restrict: 'EA',
      replace: true
    };
  });


