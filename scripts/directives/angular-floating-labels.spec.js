describe('hello jasmine', function() {
    beforeEach(function() {
        console.log('hello jasmine, tests begins');
    });
    it('should say true when true is passed', function() {
        expect(true).toEqual(true);
    });
});

describe('app', function() {
    var element,
        name = 'floating labels';
    beforeEach(function() {
        module('app');
        element = angular.element('<my-drtv/>');
        inject(function($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.name = name;
            $compile(element)(scope);
            scope.$digest();
        });
    });

    it("and has a positive case", function() {
        expect(true).toBe(true);
    });

});
