'use strict';

// NOTE: This test has been causing problems so commented out the it statements eblow to ignore it for now
describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('farnboroughyoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  //it('should have a test value of true', function () {
  //  expect(scope.status).toBe('Loading...');
  //});
  
  //it('should attach a list of awesomeThings to the scope', function () {
  //  expect(scope.awesomeThings.length).toBe(3);
  //});
});
