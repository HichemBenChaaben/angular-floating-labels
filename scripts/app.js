!function(){"use strict";angular.module("app",["ui.router","app.directives.floatinglabels","hljs"]).config(function(t,e,l){l.setOptions({tabReplace:"  ",languages:"html"}),t.state("home",{url:"/",controller:"MainCtrl",controllerAs:"home",templateUrl:"src/views/main.html"}).state("components",{url:"/components",controller:"FormsCtrl",controllerAs:"fm",templateUrl:"src/views/components.html"}).state("contact",{url:"/contact",controllerAs:"cm",controller:"ContactCtrl",templateUrl:"src/views/contact.html"}).state("demo",{url:"demo",templateUrl:"src/views/demo.html"}).state("cs",{url:"/floating-labels-contributors",templateUrl:"src/views/contributors.html"}),e.otherwise("/")})}();ome',
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
