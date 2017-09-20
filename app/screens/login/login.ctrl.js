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
