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