(function() {
    'use strict';

    angular.module('app').controller('FormsCtrl', fm);

    fm.$inject = ['$scope', '$location', '$anchorScroll'];

    function fm($scope) {
        var vm = this;

        vm.simpleNumber = '123';

        validateForm(vm.registration);

        /**
         * [validateForm validates a set in the form]
         * @return {[type]} [description]
         */
        validateForm = function(arg) {
            if(arg.length > 10) {
                console.log('too many characters..');
            }
        };
        // Anchor scroll function
        vm.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        }

    };

})();
