(function (angular, appSettings) {
    "use strict";

    var app = angular.module(appSettings.dependencies.controllers);

    app.controller('LogoutCtrl', ['$scope', '$rootScope', 'loginService', '$window', '$location', function ($scope, $rootScope, loginService, $window, $location) {

        loginService.logout();

        $window.location = '/#!/home';
        $rootScope.user = null;
        
    }]);

})(window.angular, window.appSettings);