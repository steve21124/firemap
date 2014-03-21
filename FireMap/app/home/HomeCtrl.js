(function (angular, appSettings) {
    "use strict";

    var app = angular.module(appSettings.dependencies.controllers);

    app.controller('HomeCtrl', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {

        $scope.goToLogin = function goToLogin() {
            $window.location = '#!/login';
        };

        $scope.goToRegister = function goToLogin() {
            $window.location = '#!/login?q=register';
        };

    }]);

})(window.angular, window.appSettings);