(function(){
    var app = angular.module('trackMarketApp');
    app.config(function($locationProvider){
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);
    });
})();