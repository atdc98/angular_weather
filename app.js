// MODULE
var forecastApp = angular.module('forecastApp', ['ngResource', 'ngRoute']);

// ROUTES
forecastApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'routes/index.htm',
    controller: 'mainCtrl'
  })
  .when('/forecast', {
    templateUrl: 'routes/forecast.htm',
    controller: 'forecastCtrl'
  })
  .when('/forecast/:num_days', {
    templateUrl: 'routes/forecast.htm',
    controller: 'forecastCtrl'
  })
  .when('/current', {
    templateUrl: 'routes/current.htm',
    controller: 'currentCtrl'
  });
});

// CUSTOM SERVICES
forecastApp.service('locService', function() {
  this.location = config.CITY;
  this.country = config.COUNTRY;
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
  
  this.toDate = function (ms) {
    return new Date(ms*1000);
    // .toDateString(); - could append .toDateString(); to the new Date() and have it output
    // a correct date string, but let's do this the Angular way in the view.
  }
});

// CONTROLLERS
forecastApp.controller('mainCtrl', ['$scope', 'locService', function ($scope, locService) {
  $scope.location = locService.location;
  $scope.$watch('location', function() {
    locService.location = $scope.location;
  });
}]);


forecastApp.controller('forecastCtrl', ['$scope', '$resource', '$routeParams', 'locService', 'conversionService', function ($scope, $resource, $routeParams, locService, conversionService) {
  
  $scope.location = locService.location;
  $scope.country = locService.country;
  
  config.DAYCOUNT = $routeParams.num_days || config.DAYCOUNT;
  $scope.num_days = $routeParams.num_days || config.DAYCOUNT;
  
  $scope.convertToFahrenheit = function (deg) {
    return conversionService.toFahrenheit(deg);
  };
  
  $scope.timeConvert = function (ms) {
    return conversionService.toDate(ms);
  }
  
  $scope.openWeatherAPI = $resource(config.APIURL_FORECAST, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
  
  $scope.openWeatherResult = $scope.openWeatherAPI.get({
    APPID: config.APIKEY,
    q: $scope.location + ',' + $scope.country,
    units: config.UNITS,
    mode: config.DATAMODE,
    cnt: config.DAYCOUNT
  });
console.log($scope.openWeatherResult);
}]);


forecastApp.controller('currentCtrl', ['$scope', '$resource', '$routeParams', 'locService', 'conversionService', function ($scope, $resource, $routeParams, locService, conversionService) {
  
  $scope.location = locService.location;
  $scope.country = locService.country;
  
  $scope.convertToFahrenheit = function (deg) {
    return conversionService.toFahrenheit(deg);
  };
  
  $scope.timeConvert = function (ms) {
    return conversionService.toDate(ms);
  }
  
  $scope.openWeatherAPI = $resource(config.APIURL_CURRENT, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
  
  $scope.openWeatherResult = $scope.openWeatherAPI.get({
    APPID: config.APIKEY,
    q: $scope.location + ',' + $scope.country,
    units: config.UNITS,
    mode: config.DATAMODE
  });
  
}]);


// CUSTOM DIRECTIVES
forecastApp.directive("dailyForecast", function() {
   return {
     restrict: 'E',
     templateUrl: 'directives/daily_forecast.htm',
     replace: true,
     scope: {
       day: "=",
       convertTemp: "&",
       convertDate: "&",
       dateFormat: "@"
     }
   }
});