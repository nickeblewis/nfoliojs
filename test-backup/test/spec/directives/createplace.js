'use strict';

describe('Directive: createplace', function () {

  // load the directive's module
  beforeEach(module('nfolio'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<createplace></createplace>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the createplace directive');
  }));
});
