// MODULE
var forecastApp = angular.module('forecastApp', ['ngResource', 'ngRoute']);

// ROUTES
forecastApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/index.htm',
    controller: 'mainCtrl'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastCtrl'
  })
  .when('/current', {
    templateUrl: 'pages/current.htm',
    controller: 'currentCtrl'
  });
});

// CUSTOM SERVICES
forecastApp.service('locService', function() {
  this.location = 'Parkville, MO';
  this.country = 'US';
});

forecastApp.service('conversionService', function() {
  this.toFahrenheit = function (deg) {
    switch (config.UNITS) {
      case 'Kelvin':
        return Math.round((1.8 * (deg - 273)) + 32);
        break;
      case 'Metric':
        return Math.round((1.8 * deg) + 32);
        break;
      default:
        return deg;
      break;
    }
  };
  
  this.secondsToDate = function (seconds) {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(seconds);
    return d.toDateString();
  }
});

// CONTROLLERS
forecastApp.controller('mainCtrl', ['$scope', 'locService', function ($scope, locService) {
  $scope.location = locService.location;
  $scope.$watch('location', function() {
    locService.location = $scope.location;
  });
}]);

forecastApp.controller('currentCtrl', ['$scope', '$resource', 'locService', 'conversionService', function ($scope, $resource, locService, conversionService) {
  
  $scope.location = locService.location;
  $scope.country = locService.country;
  
  $scope.convertToFahrenheit = function (deg) {
    return conversionService.toFahrenheit(deg);
  };
  
  $scope.timeConvert = function (seconds) {
    return conversionService.secondsToDate(seconds);
  }
  
  $scope.openWeatherAPI = $resource(config.APIURL_CURRENT, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
  
  $scope.openWeatherResult = $scope.openWeatherAPI.get({
    APPID: config.APIKEY,
    q: $scope.location + ',' + $scope.country,
    units: config.UNITS,
    mode: config.DATAMODE
  });
  
}]);

forecastApp.controller('forecastCtrl', ['$scope', '$resource', 'locService', 'conversionService', function ($scope, $resource, locService, conversionService) {
  
  $scope.location = locService.location;
  $scope.country = locService.country;
  
  $scope.convertToFahrenheit = function (deg) {
    return conversionService.toFahrenheit(deg);
  };
  
  $scope.timeConvert = function (seconds) {
    return conversionService.secondsToDate(seconds);
  }
  
  $scope.openWeatherAPI = $resource(config.APIURL_FORECAST, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
  
  $scope.openWeatherResult = $scope.openWeatherAPI.get({
    APPID: config.APIKEY,
    q: $scope.location + ',' + $scope.country,
    units: config.UNITS,
    mode: config.DATAMODE,
    cnt: config.DAYCOUNT
  });
  
}]);