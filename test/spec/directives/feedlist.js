'use strict';

describe('Directive: feedlist', function () {

  // load the directive's module
  beforeEach(module('farnboroughyoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<feedlist></feedlist>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the feedlist directive');
  }));
});
