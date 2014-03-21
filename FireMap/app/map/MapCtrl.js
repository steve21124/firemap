(function (angular, appSetting, google, _) {
    "use strict";

    var app = angular.module(appSettings.dependencies.controllers);

    app.controller('MapCtrl',
        ['$scope', '$rootScope', '$window', 'Location', '$firebase', 'toaster', 'FBURL',
            function ($scope, $rootScope, $window, Location, $firebase, toaster, FBURL) {

                var fbRef = new Firebase(FBURL);
                var locationRef = fbRef.child('locations');

                $scope.locations = $firebase(locationRef);

                $scope.supportsGeo = $window.navigator;
                $scope.locationMarkers = [];

                $scope.locations.$on('loaded', function (newLocations) {
                    _.each(newLocations, function (location) {
                        $scope.locationMarkers.push(location);
                    });
                    $scope.map.center = $scope.locationMarkers[$scope.locationMarkers.length - 1];
                });

                // add new locations to the list
                $scope.checkIn = function () {
                    if ($scope.supportsGeo) {
                        $window.navigator.geolocation.getCurrentPosition(function (position) {

                            var newLocation = Location.create({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                user: $scope.user,
                                date: new Date()
                            });

                            $scope.locations.$add(newLocation);

                            $scope.map.center = newLocation;

                        }, function (error) {
                            console.error(error);
                        });
                    }
                };

                $scope.setCenter = function (location) {
                    $scope.map.center = location;
                };

                var onMarkerClicked = function (marker) {
                    marker.showWindow = true;
                };

                $scope.map = {
                    center: {
                        latitude: 39.7643389,
                        longitude: -104.8551114,
                    },
                    zoom: 15,
                    markers: $scope.locationMarkers
                };

                // set the map marker events
                // TODO: refactor to service
                _.each($scope.map.markers, function (marker) {
                    marker.closeClick = function () {
                        marker.showWindow = false;
                        $scope.$apply();
                    };
                    marker.onClicked = function () {
                        onMarkerClicked(marker);
                    };
                });

            }]);

})(window.angular, window.appSettings, google, _);