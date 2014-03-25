'use strict';

describe('Directive: statusbar', function () {

  // load the directive's module
  beforeEach(module('farnboroughyoApp'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  //it('should make hidden element visible', inject(function ($compile) {
  //  element = angular.element('<statusbar></statusbar>');
  //  element = $compile(element)(scope);
  //  expect(element.text()).toBe('this is the statusbar directive');
  //}));
});
