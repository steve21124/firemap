(function (angular, appSettings) {
    "use strict";

    var app = angular.module(appSettings.dependencies.controllers);

    app.controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function ($scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        $scope.logout = function () {
            loginService.logout();
        };

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;
        $scope.initials = null;

        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
        };

        $scope.updatePassword = function () {
            $scope.reset();
            loginService.changePassword(buildPwdParms());
        };

        function buildPwdParms() {
            return {
                email: $scope.auth.user.email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function (err) {
                    if (err) {
                        $scope.err = err;
                    }
                    else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            }
        }

    }]);

})(window.angular, window.appSettings);