(function (angular, appSettings) {
    'use strict';

    angular.module(appSettings.dependencies.directives, []).
      directive('appVersion', ['version', function (version) {
          return function (scope, elm, attrs) {
              elm.text(version);
          };
      }]);

})(window.angular, window.appSettings);