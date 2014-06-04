'use strict';

describe('Directive: photogrid', function () {

  // load the directive's module
  beforeEach(module('nfolioApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<photogrid></photogrid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the photogrid directive');
  }));
});
