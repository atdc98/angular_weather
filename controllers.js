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