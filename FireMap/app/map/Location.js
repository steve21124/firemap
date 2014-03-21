(function (angular, appSettings) {

    var app = angular.module(appSettings.appName);

    function convertToUTC(dt) {
        var localDate = new Date(dt);
        var localTime = localDate.getTime();
        var localOffset = localDate.getTimezoneOffset() * 60000;
        return new Date(localTime + localOffset);
    };

    var Location = (function (params) {
        angular.extend(this, params);

        function Location(params) {
            this.latitude = params.latitude;
            this.longitude = params.longitude;
            this.title = params.title;
            this.user = params.user;
            this.date = convertToUTC(new Date(params.date));
        };

        Location.prototype.toasterTitle = function () {
            return this.user.email + " has just checked in at " + this.latitude + ", " + this.longitude + ".";
        };

        Location.prototype.toMarkerOptions = function () {
            return {
                latitude: this.latitude,
                longitude: this.longitude,
                user: this.user,
                date: this.date
            };
        };

        return new Location(params);
    });

    Location.create = function create(params) {
        return new Location(params);
    };

    app.factory('Location', function () {
        return Location;
    });

})(window.angular, window.appSettings);