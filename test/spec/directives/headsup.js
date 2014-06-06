'use strict';

describe('Directive: headsup', function () {

  // load the directive's module
  beforeEach(module('nfolioApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<headsup></headsup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the headsup directive');
  }));
});
