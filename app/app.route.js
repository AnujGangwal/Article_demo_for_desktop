(function() {
    'use strict';
    angular.module('app')
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/article', {
                    templateUrl: 'app/screens/articles/article.tmpl.html',
                    controller: 'articleCtrl',
                    controllerAs: 'vm'
                })
                .when('/login', {
                    templateUrl: 'app/screens/login/login.tmpl.html',
                    controller: 'loginCtrl',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/login'
                });
            $locationProvider.hashPrefix('');
        }]).run(['$rootScope', '$location', function($rootScope, $location) {
            var path = function() {
                return $location.path();
            };
            $rootScope.$watch(path, function(newVal, oldVal) {
                $rootScope.activetab = newVal;
            });
        }]);
})();
