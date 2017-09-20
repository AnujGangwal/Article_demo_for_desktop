(function() {
    'use strict';
    angular.module('app', [
        'app.layout',
        'app.widgets',
        'app.article'
    ]);
})();

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

(function() {
    'use strict';
    angular.module('app.layout', [
            'ngRoute', 'ngResource', 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'smart-table'
        ]).constant('moment', moment)
        .constant('toastr', toastr);
})();

(function() {
    'use strict';
    angular.module('app.widgets', []);
})();

(function() {
    'use strict';
    angular.module('app.article', ['ngRoute', 'ngResource']);
})();

(function() {
    'use strict';
    angular
        .module('app.widgets')
        .factory('logger', logger);
    logger.$inject = ['$log', 'toastr'];

    function logger($log, toastr) {
        var service = {
            showToasts: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            // straight to console; bypass toastr
            log: $log.log
        };
        toastr.options.timeOut = 8000;
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.tapToDismiss = true;
        return service;

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
}());

(function() {
    'use strict';
    angular
        .module('app.layout')
        .controller('LayoutCtrl', LayoutCtrl);
    LayoutCtrl.$inject = ['$scope', '$rootScope', '$cookies', 'logger', '$q', '$location'];

    function LayoutCtrl($scope, $rootScope, $cookies, logger, $q, $location) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.isLogin = false;
        $rootScope.appUserName = $cookies.get('username');
        $rootScope.signOut = signOut;

        function signOut() {
            var param = {
                "username": $cookies.get('username')
            };
            $cookies.put("isLogin", false);
            //$cookies.put('sessionID', null);
            $cookies.put('username', null);
            $cookies.remove('username');
            $rootScope.isLogin = false;
            $rootScope.navShow = false;
            $location.path('/login');
            logger.success("logout Successful.");
        }
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            var getcookie = $cookies.get('isLogin');
            if (getcookie === 'false' || getcookie === undefined) {
                $rootScope.isLogin = false;
                $location.path('/login');
            } else {
                $rootScope.isLogin = true;
            }
            var loc = $rootScope.activetab;
            var pageName = loc.replace('/', '');
            angular.element('body').attr({
                'class': 'nav-md quest-admin ' + pageName
            });
        });
        $scope.$on('$viewContentLoaded', function() {
            if ($location.path() !== '/login' && $rootScope.isLogin === false) {
                $location.path('/login');
            } else if ($location.path() !== $rootScope.activetab && $rootScope.activetab !== '/login') {
                $location.path('/under-construction');
            }
        });

        function activate() {
            //statements
        }
        /* default running function */
        activate();
    }
})();

(function() {
    'use strict';
    angular
        .module('app.article')
        .controller('articleCtrl', articleCtrl);
    articleCtrl.$inject = ['$scope', 'logger', '$location', '$timeout'];

    function articleCtrl($scope, logger, $location, $timeout) {
        var vm = this;
        console.log("articleCtrl");
        vm.articleShow = true;
        vm.accor = false;
        vm.showFirst = true;
        vm.showSecond = false;
        vm.openArticle = function(value) {
            if (value === '1') {
                console.log("1");
                vm.showFirst = true;
                vm.showSecond = false;
                document.getElementById("Article1").classList.add('in');
            } else {
                console.log("2");
                vm.showFirst = false;
                vm.showSecond = true;
                document.getElementById("Article1").classList.add('in');
            }
        };
        vm.changeArticle = function(article) {
            if (article === 'nextFirst') {
                console.log("nextFirst click", article);
                vm.showFirst = false;
                vm.showSecond = true;
            } else if (article === 'preSecond') {
                console.log("preSecond click", article);
                vm.showFirst = true;
                vm.showSecond = false;
            } else {
                logger.error("Out of limit");
            }
        };
    }
})();

(function() {
    'use strict';
    angular
        .module('app.layout')
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope', '$rootScope', '$cookies', '$http', 'logger', '$location'];

    function loginCtrl($scope, $rootScope, $cookies, $http, logger, $location) {
        /* public variables */
        var vm = this;
        $scope.loginForm = {};
        $rootScope.isLogin = false;
        // $rootScope.navShow = true;
        /* private variables */
        vm.user = {};
        // vm.user.username = "xyz";
        // vm.user.password = "Test@123";
        vm.login = login;

        function login(user) {
            if (vm.user.username === undefined) {
                logger.error("Please enter User Name.");
            } else if (vm.user.password === undefined) {
                logger.error("Please enter valid password");
            } else {
                var param = {
                    "username": vm.user.username,
                    "password": vm.user.password
                };
                $rootScope.appUserName = vm.user.username;
                $cookies.put('isLogin', true);
                $cookies.put("username", vm.user.username);
                var pswd = vm.user.password;
                var tempUser = $cookies.get('username');
                if (tempUser === 'test' && pswd === 'Anuj') {
                    $rootScope.isLogin = true;
                    $rootScope.navShow = true;
                    logger.success("login successful.");
                    $location.path('/article');
                } else {
                    logger.error("Invalid credentials");
                    $rootScope.navShow = false;
                }
            }
        }
    }
})();
