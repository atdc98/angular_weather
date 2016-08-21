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

forecastApp.service('apiService', ['$resource', function($resource) {
  this.getWeather = function (url, search_object) {
    var openWeatherAPI = $resource(url, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
  
    return openWeatherAPI.get(search_object);
  }
  
}]);