(function() {
    'use strict';

    angular.module('app').controller('MainCtrl', main);
    main.$inject = ['$scope'];

    function main($scope) {
        // Values retured instead of $scope.things
        var vm = this;
        vm.one = 'Please type your name here';
        vm.two = 'Pelase type your email address';

        vm.oneVal = 'Hichem ben chaabene';
        vm.twoVal = 'benchaaben.hichem@live.fr';

        vm.tip = 'You should type your full name including special characters';
        vm.tipTwo = 'Your email should not be more than 10 characters';

        vm.isError = true;
        vm.flErrors = 'This is an error message';
    };

})();
