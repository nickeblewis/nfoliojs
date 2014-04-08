'use strict';

describe('EditCtrl', function () {
    beforeEach(module('farnboroughyoApp'));
  
    var EditCtrl,
        scope;
    
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        EditCtrl = $controller('EditCtrl', {
            $scope: scope
        });
    }));

    it('should load a place from a firebase', function () {
        expect(scope.place).toBeDefined();
    });
});