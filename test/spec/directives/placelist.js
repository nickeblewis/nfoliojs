'use strict';

describe('Directive: placelist', function () {

  // load the directive's module
  beforeEach(module('farnboroughyoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<placelist></placelist>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the placelist directive');
  }));
});
