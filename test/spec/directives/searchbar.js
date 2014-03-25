'use strict';

describe('Directive: searchbar', function () {

  // load the directive's module
  beforeEach(module('farnboroughyoApp'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  //it('should make hidden element visible', inject(function ($compile) {
  //  element = angular.element('<searchbar></searchbar>');
  //  element = $compile(element)(scope);
  //  expect(element.text()).toBe('this is the searchbar directive');
  //}));
});
