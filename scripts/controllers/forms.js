!function(){"use strict";function o(){var o=this;o.scrollTo=function(o){$location.hash(o),$anchorScroll()},o.checkboxMessage="check me please"}angular.module("app").controller("FormsCtrl",o),o.$inject=["$scope","$location","$anchorScroll"]}();     vm.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };
        vm.checkboxMessage = 'check me please';
    }];
})();
