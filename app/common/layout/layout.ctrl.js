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
