(function() {

  'use strict';

  angular.module.controller('ContactCtrl as ct', contactme);

  contactme.$inject = ['$scope'];

  function contactme() {
    var vm = this;

    vm.things = ['one', 'two', 'three'];
  };

})();
