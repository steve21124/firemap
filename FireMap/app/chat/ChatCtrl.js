(function (angular, appSettings) {
    "use strict";

    var app = angular.module(appSettings.dependencies.controllers);

    app.controller('ChatCtrl', ['$scope', '$rootScope', '$window', '$location', 'syncData', function ($scope, $rootScope, $window, $location, syncData) {

        $scope.messages = syncData('messages', 100);

        $scope.addMessage = function () {
            if ($scope.newMessage) {
                $scope.messages.$add({ user: $rootScope.user.initials, text: $scope.newMessage });
                $scope.newMessage = null;
            }
        };

        $scope.enterMessage = function (ev) {
            if (ev.which == 13)
                $scope.addMessage();
        }

    }]);

})(window.angular, window.appSettings);