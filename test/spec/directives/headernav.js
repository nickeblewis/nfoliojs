'use strict';

describe('Directive: headernav', function () {

  // load the directive's module
  beforeEach(module('farnboroughyoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<headernav></headernav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the headernav directive');
  }));
});
