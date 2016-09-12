angular
  .module('EventApp')
  .service('SignupService', service);

service.$inject = ['$localStorage'];

function service ($localStorage) {

  return {
    signup: signup
  };

  function signup (user) {
    delete user.confirm_password;
    $localStorage.user = user;
    return true;
  }

}
