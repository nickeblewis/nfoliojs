'use strict';

describe('Directive: statuspost', function () {

  // load the directive's module
  beforeEach(module('farnboroughyoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<statuspost></statuspost>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the statuspost directive');
  }));
});
