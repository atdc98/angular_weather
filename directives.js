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