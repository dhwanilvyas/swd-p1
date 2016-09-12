angular
  .module('EventApp')
  .controller('SignupController', controller);

controller.$inject = ['$state', 'growl', 'SignupService'];

function controller ($state, growl, SignupService) {

  $("input:text:visible:first").focus();

  var ViewModel = this;

  var partial = 100/3;

  var fields = [];

  ViewModel.progress = 0;

  ViewModel.signup = function () {
    if (SignupService.signup(ViewModel.user)) {
      growl.addSuccessMessage('Signup Successfull');
      ViewModel.user = {};
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
}
