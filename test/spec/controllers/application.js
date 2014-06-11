'use strict';

describe('Controller: ApplicationctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('nfolioApp'));

  var ApplicationctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplicationctrlCtrl = $controller('ApplicationctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
