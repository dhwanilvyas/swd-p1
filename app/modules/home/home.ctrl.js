var app = angular.module('EventApp');

app.controller('HomeController',controller);

controller.$inject = ['EventService'];

function controller (EventService) {
  var ViewModel = this;

  ViewModel.events = EventService.getList();
}
