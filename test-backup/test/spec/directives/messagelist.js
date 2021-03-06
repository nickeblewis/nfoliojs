'use strict';

describe('Directive: messagelist', function () {

  // load the directive's module
  beforeEach(module('nfolio'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<messagelist></messagelist>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the messagelist directive');
  }));
});
