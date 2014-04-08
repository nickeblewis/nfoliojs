'use strict';

describe('MainCtrl', function () {
    beforeEach(module('farnboroughyoApp'));
  
    var MainCtrl,
        scope;
    
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    //it('should have a blank authmessage', function () {
    //    expect(scope.canbetested).toBeTruthy();
    //});
});