(function (window, document, angular) {

    // TODO: create a closure to abstract appSettings object
    var baseAppName = "firemap";

    var appSettings = {
        appName: baseAppName,
        dependencies: {
            config: baseAppName + ".config",
            firebase: 'firebase',
            services: baseAppName + '.services',
            filters: baseAppName + ".filters",
            directives: baseAppName + ".directives",
            controllers: baseAppName + ".controllers",
            firebaseService: baseAppName + '.service.firebase',
            waitForAuth: 'waitForAuth',
            routeSercurity: 'routeSecurity',
            routeProvider: 'ngRoute',
            firebaseLogin: 'firebase.service.login',
            googleMaps: 'google-maps',
            toaster: 'toaster',
            firebase: 'firebase'
        },
        dependenciesToArray: function () {
            return angular.forEach(appSettings.dependencies, function (dependency) {
                return dependency
            });
        }
    };

    window.appSettings = appSettings;

    var htmlElement = document.querySelector("body");
    htmlElement.setAttribute("data-ng-app", baseAppName);
 
})(window, document, window.angular);