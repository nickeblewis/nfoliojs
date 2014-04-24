'use strict';

angular.module('farnboroughyoApp')
  .directive('searchbar', function () {
    return {
      template: '<div class="col-md-12 card search"><div class="status-bar"><input type="text" ng-model="search" class="form-control" placeholder="Search"></div></div>',
      restrict: 'EA',
      replace: true
    };
  });

