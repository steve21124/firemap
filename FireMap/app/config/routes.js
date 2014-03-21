(function (angular, appSettings) {
    "use strict";

    angular.module(appSettings.appName)

       // configure views; the authRequired parameter is used for specifying pages
       // which should only be available while logged in
       .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

           $locationProvider.hashPrefix('!');

           $routeProvider.when('/home', {
               templateUrl: '/app/home/home.html',
               controller: 'HomeCtrl'
           });

           $routeProvider.when('/map', {
               authRequired: true, // must authenticate before viewing this page
               templateUrl: '/app/map/map.html',
               controller: 'MapCtrl'
           });

           $routeProvider.when('/chat', {
               authRequired: true, // must authenticate before viewing this page
               templateUrl: '/app/chat/chat.html',
               controller: 'ChatCtrl'
           });

           $routeProvider.when('/account', {
               authRequired: true, // must authenticate before viewing this page
               templateUrl: '/app/account/account.html',
               controller: 'AccountCtrl'
           });

           $routeProvider.when('/login', {
               templateUrl: '/app/auth/login.html',
               controller: 'LoginCtrl'
           });

           $routeProvider.when('/logout', {
               template: 'Logging out!',
               controller: 'LogoutCtrl'
           });

           $routeProvider.otherwise({ redirectTo: '/home' });
       }])
       
})(window.angular, window.appSettings);

