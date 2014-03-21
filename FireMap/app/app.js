(function (angular, appSettings) {
    'use strict';

    // Declare app level module which depends on filters, and services
    angular.module(appSettings.appName, appSettings.dependenciesToArray())

       .run(['loginService', '$rootScope', 'FBURL', '$location', 'Location', 'toaster', '$firebase',
           function (loginService, $rootScope, FBURL, $location, Location, toaster, $firebase) {
           if (FBURL === 'https://INSTANCE.firebaseio.com') {
               // double-check that the app has been configured
               angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
               setTimeout(function () {
                   angular.element(document.body).removeClass('hide');
               }, 250);
           }
           else {
               // establish authentication
               $rootScope.auth = loginService.init('/login');
               var user = $rootScope.auth.$getCurrentUser();
               var ref = new Firebase(FBURL);

               // is the user logged in?
               user.then(function (response) {
                   if (!response) { return; }
                   ref.child('users/' + response.uid).once('value', function (snap) {
                       $rootScope.$apply(function () {
                           $rootScope.user = snap.val();
                           // set  the site wide updates for new locations
                           ref.child('locations').endAt().limit(1).on("child_added", function (snapshot) {
                               var newLocation = Location.create(snapshot.val());
                               toaster.pop('info', newLocation.toasterTitle(), '');
                           });
                       });
                   });
               });

           }
       }]);

})(window.angular, window.appSettings);
