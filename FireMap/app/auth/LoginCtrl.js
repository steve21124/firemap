(function (angular, appSettings) {
    "use strict";

    var app = angular.module(appSettings.dependencies.controllers);

    app.controller('LoginCtrl', ['$scope', '$rootScope', 'loginService', '$location', 'Firebase',
        function ($scope, $rootScope, loginService, $location, Firebase) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = $location.search().q ? true : false;
        $scope.initials = null

        $scope.login = function(cb) {
            $scope.err = null;
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass ) {
                $scope.err = 'Please enter a password';
            }
            else {

                loginService.login($scope.email, $scope.pass, function (err, user) {
                    $scope.err = err ? err + '' : null;                    
                    if (!err) {
                        $rootScope.user = user;
                        cb && cb(user);
                    }
                });
            }
        };

        $scope.createAccount = function() {
            $scope.err = null;
            if( assertValidLoginAttempt() ) {
                loginService.createAccount($scope.email, $scope.pass, function(err, user) {
                    if( err ) {
                        $scope.err = err? err + '' : null;
                    }
                    else {
                        // must be logged in before I can write to my profile
                        $scope.login(function (user) {
                            loginService.createProfile(user.uid, user.email, $scope.initials);
                            $rootScope.user.initials = $scope.initials;
                        });
                    }
                });
            }
        };

        function assertValidLoginAttempt() {
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass ) {
                $scope.err = 'Please enter a password';
            }
            else if( $scope.pass !== $scope.confirm ) {
                $scope.err = 'Passwords do not match';
            }
            else if (!$scope.initials) {
                $scope.err = 'Enter your initials';
            }
            return !$scope.err;
        }
    }])

})(window.angular, window.appSettings);