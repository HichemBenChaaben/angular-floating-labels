(function() {

  'use strict';

  angular.module('app')
    .controller('ContactCtrl as ct', contactme);

  contactme.$inject = ['$scope'];

  function contactme() {
    var vm = this;

    vm.things = ['one', 'two', 'three'];
  };

})();
