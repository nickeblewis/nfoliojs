'use strict';

angular.module('nfolio')
  .directive('statusbar', function () {
    return {
      template: '<div class="col-md-12 card"><div class="status-bar"><strong><a href="#/show/{{statusref}}">{{status}}</a></strong></div></div>',
      restrict: 'EA',
      replace: true
    };
  });


