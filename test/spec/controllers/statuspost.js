'use strict';

describe('Controller: StatuspostctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('farnboroughyoApp'));

  var StatuspostctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatuspostctrlCtrl = $controller('StatuspostctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
