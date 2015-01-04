(function(){
  'use strict';

  angular.module('app').controller('MainCtrl', main);

  main.$inject = ['$scope'];

  function main($scope) {
    var vm = this;
    vm.things = ['angular', 'is', 'awesome'];

  };

})();
