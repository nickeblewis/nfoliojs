'use strict';

describe('Directive: grid', function () {

  // load the directive's module
  beforeEach(module('nfolio'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  //it('should make hidden element visible', inject(function ($compile) {
  //  element = angular.element('<grid></grid>');
  //  element = $compile(element)(scope);
  //  expect(element.text()).toBe('this is the grid directive');
  //}));
});
