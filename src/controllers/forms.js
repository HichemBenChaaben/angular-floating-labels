(function(){
  'use strict';

  angular.module('app').controller('FormsCtrl', fm);

  fm.$inject = ['$scope', '$location', '$anchorScroll'];

  function fm($scope) {
    var vm = this;
    vm.things = ['angular', 'is', 'awesome'];
    vm.textInput = 'this is the input text';
    vm.customValue = $scope.customValue = 'custom value from -> controller';
    vm.customPlaceholder = $scope.customPlaceholders = 'The scope ph';

    $scope.whatever = 'whatever placholder';
    $scope.tl = 'whatever tooltip';

    // Anchor scroll function
    vm.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    }

  };

})();
