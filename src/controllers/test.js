(function() {

    'use strict';

    angular.module('app').controller('TestCtrl', TestCtrl);

    TestCtrl.$inject = ['$scope'];

    function TestCtrl($scope) {
        var vm = this;
        $scope.checkboxMessage = 'Hello from the controller';
    }

}());
