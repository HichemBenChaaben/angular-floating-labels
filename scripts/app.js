!function(){"use strict";angular.module("app",["ui.router","app.directives.floatinglabels","hljs"]).config(function(t,l,e){e.setOptions({tabReplace:"  ",languages:"html"}),t.state("home",{url:"/",controller:"MainCtrl",controllerAs:"home",templateUrl:"src/views/main.html"}).state("components",{url:"/components",controller:"FormsCtrl",controllerAs:"fm",templateUrl:"src/views/components.html"}).state("contact",{url:"/contact",controllerAs:"cm",controller:"ContactCtrl",templateUrl:"src/views/contact.html"}).state("test",{url:"test",controller:"TestCtrl",cotrollerAs:"test",templateUrl:"src/views/test.html"}).state("cs",{url:"/floating-labels-contributors",templateUrl:"src/views/contributors.html"}),l.otherwise("/")})}();ate('components', {
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
                .state('test', {
                    url: 'test',
                    controller: 'TestCtrl',
                    cotrollerAs: 'test',
                    templateUrl: 'src/views/test.html'
                })
                .state('cs', {
                    url: '/floating-labels-contributors',
                    templateUrl: 'src/views/contributors.html'
                });
            $urlRouterProvider.otherwise('/');
        });

})();
