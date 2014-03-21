(function(angular, appSettings) {
   'use strict';

   /* Services */

   angular.module(appSettings.dependencies.services, [appSettings.dependencies.firebaseLogin, appSettings.dependencies.firebaseService])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

})(window.angular, window.appSettings);

