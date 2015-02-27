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

        vm.simpleNumber = '123';

        $scope.countries = ['tunisia', 'dubai', 'usa', 'france', 'brazil'];
        var something = 'This is the something variable';
        vm.validateNumber = function(arg) {
            if(!arg) {
                arg = '';
            }
            console.log(arg);
            if(arg.length > 10) {
                console.log('too long');
            }
        };

        $scope.checked = true;

        $scope.doSomething = function() {
            console.log('Im the function doSomething');
        }
        $scope.hello = 'i\'m a checkbox';

        $scope.dataSet = ['one', 'two', 'three'];
        $scope.hint = 'this is a hint from the controller';
        $scope.labelSel = 'this is a hint from the controller';
    };

})();
