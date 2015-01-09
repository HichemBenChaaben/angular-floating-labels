(function() {

    'use strict';

    /**
     * @ngdoc overview
     * @name angular floating labels
     * @description
     * angular floting labels
     */

    angular
      .module('app', [
          'ui.router',
          'app.directives.floatinglabels',
          'hljs'
      ])
      .config(function($stateProvider, $urlRouterProvider, hljsServiceProvider) {
        // headghlightjs configuration
        // replace tab with 4 spaces
        hljsServiceProvider.setOptions({
          tabReplace: '  ',
          languages: 'html javascript'
        });

        $stateProvider.
        state('home', {
          url: '/',
          controller: 'MainCtrl',
          controllerAs: 'fm',
          templateUrl: 'src/views/main.html'
        })
        .state('components', {
          url: '/components',
          controller: 'FormsCtrl',
          controllerAs: 'fm',
          templateUrl: 'src/views/components.html'
        })
        .state('contact', {
          url: '/contact',
          controllerAs: 'cm',
          controller: 'ContactCtrl',
          templateUrl: 'src/views/contact.html'
        })
        .state('demo', {
          url: 'demo',
          templateUrl: 'src/views/demo.html'
        })
        .state('cs', {
          url: '/floating-labels-contributors',
          templateUrl: 'src/views/contributors.html'
        });
        $urlRouterProvider.otherwise('/');
      });

})();
