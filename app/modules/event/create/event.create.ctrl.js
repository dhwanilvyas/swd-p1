angular
  .module('EventApp')
  .controller('CreateEventController', controller);

controller.$inject = ['$state', 'growl', 'EventService'];

function controller ($state, growl, EventService) {

  $("input:text:visible:first").focus();
  
  var ViewModel = this;

  var partial = 100/7;

  var fields = [];

  ViewModel.progress = 0;

  ViewModel.create = function () {
    var location = document.getElementById('location').value;
    ViewModel.event.location = location;
    if (EventService.create(ViewModel.event)) {
      growl.addSuccessMessage('Event Creation Successful');
      $state.go('home');
    }
  }

  ViewModel.checkValidity = function (field, name) {
    if (field && $.inArray(name,fields) == -1) {
      fields.push(name);
      ViewModel.progress += partial;
    }
    if(!field && $.inArray(name,fields) != -1) {
      fields.splice($.inArray(name, fields),1);
      ViewModel.progress -= partial;
    }
  }

  ViewModel.geoLocate = function () {
    if (navigator.geolocation) {
      initAutocomplete();
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('location')),
        {types: ['geocode']});
  }
}
