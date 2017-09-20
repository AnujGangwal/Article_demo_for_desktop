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
