(function() {
    'use strict';

    angular.module('app').controller('MainCtrl', main);
    main.$inject = ['$scope'];

    function main($scope) {
        // Values retured instead of $scope.things
        var vm = this;
        vm.one = 'This is a simple value here';
        vm.tip = 'This is a simple tooltip value here';
    };

})();
