var app = angular.module('EventApp',['ui.router','ngStorage','angular-growl','ngAnimate','ngMessages']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider','growlProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,growlProvider) {

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '/dist/modules/home/home.html',
      controller: 'HomeController as ViewModel'
    })
    .state('user',{
      url: '/user',
      abstract: true,
      templateUrl: '/dist/modules/user/users.html'
    })
    .state('user.create',{
      url: '/create',
      templateUrl: '/dist/modules/user/create/user.create.html',
      controller: 'SignupController as ViewModel'
    })
    .state('event',{
      url: '/event',
      abstract: true,
      templateUrl: '/dist/modules/event/event.html'
    })
    .state('event.create',{
      url: '/create',
      templateUrl: '/dist/modules/event/create/event.create.html',
      controller: 'CreateEventController as ViewModel'
    });

  $urlRouterProvider.otherwise('/');

  growlProvider.globalTimeToLive(5000);
}]);
