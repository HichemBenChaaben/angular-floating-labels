(function() {
    'use strict';
    angular.module('app').controller('FormsCtrl', fm);
    fm.$inject = ['$scope', '$location', '$anchorScroll'];
    function fm($scope) {
        var vm = this;
        // Anchor scroll function
        vm.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };
        vm.checkboxMessage = 'check me please';
    };
})();
