// CONTROLLERS
forecastApp.controller('mainCtrl', ['$scope', '$location', 'locService', function ($scope, $location, locService) {
  
  $scope.location = locService.location;
  
  $scope.$watch('location', function() {
    locService.location = $scope.location;
  });
  
  $scope.getForecast = function () {
    $location.path("/forecast");
  };
  
}]);


forecastApp.controller('forecastCtrl', ['$scope', '$routeParams', 'locService', 'conversionService', 'apiService', function ($scope, $routeParams, locService, conversionService, apiService) {
  
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
  
  var search_object = {
    APPID: config.APIKEY,
    q: $scope.location + ',' + $scope.country,
    units: config.UNITS,
    mode: config.DATAMODE,
    cnt: config.DAYCOUNT
  };
  $scope.openWeatherResult = apiService.getWeather(config.APIURL_FORECAST, search_object);

}]);


forecastApp.controller('currentCtrl', ['$scope', '$routeParams', 'locService', 'conversionService', 'apiService', function ($scope, $routeParams, locService, conversionService, apiService) {
  
  $scope.location = locService.location;
  $scope.country = locService.country;
  
  $scope.convertToFahrenheit = function (deg) {
    return conversionService.toFahrenheit(deg);
  };
  
  $scope.timeConvert = function (ms) {
    return conversionService.toDate(ms);
  }
  
  var search_object = {
    APPID: config.APIKEY,
    q: $scope.location + ',' + $scope.country,
    units: config.UNITS,
    mode: config.DATAMODE
  };
  $scope.openWeatherResult = apiService.getWeather(config.APIURL_CURRENT, search_object);

}]);