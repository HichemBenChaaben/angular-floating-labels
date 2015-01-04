(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name quizApp
   * @description
   * quizApp
   *
   * Main module of the application.
   */

  angular
      .module('app', [
          'ui.router',
          'app.directives.floatinglabels'
      ])
      .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.
          state('home', {
            url: '/',
            controller: 'FormsCtrl',
            controllerAs: 'fm',
            templateUrl: 'src/views/forms.html'
          });
        $urlRouterProvider.otherwise('/');
      });

})();