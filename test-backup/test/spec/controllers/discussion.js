'use strict';

describe('Controller: DiscussionCtrl', function () {

  // load the controller's module
  beforeEach(module('nfolio'));

  var DiscussionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscussionCtrl = $controller('DiscussionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
