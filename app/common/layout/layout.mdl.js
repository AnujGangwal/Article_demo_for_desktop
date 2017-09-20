(function() {
    'use strict';
    angular.module('app.layout', [
            'ngRoute', 'ngResource', 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'smart-table'
        ]).constant('moment', moment)
        .constant('toastr', toastr);
})();
