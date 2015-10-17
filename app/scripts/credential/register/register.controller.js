/**
 * Created by István on 10/12/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'authenticator', 'firebaseService', 'loadOverlay', '$rootScope'];

  /* @ngInject */
  function RegisterController($log, authenticator, firebaseService, loadOverlay, $rootScope) {
    var vm = this;
    vm.title = 'RegisterController';
    vm.registerForm;
    vm.register = register;

    var users = firebaseService.getArray('users');

    activate();

    ////////////////

    function activate() {
      $rootScope.$on('credentials.register.success', handleRegisterSuccess);
      $rootScope.$on('credentials.register.error', handleRegisterFail);
    }

    function register(){
      loadOverlay.on();
      $log.info('Registering user: ' + vm.registerForm.email);
      authenticator.createUser({
        email: vm.registerForm.email,
        password: vm.registerForm.password,
        type: vm.registerForm.type
      });
    }

    function handleRegisterSuccess(authData){
      $log.info("Register success!!");
      loadOverlay.off();
    }

    function handleRegisterFail(error){
      $log.info("Register fail!!");
      loadOverlay.off();
    }
  }

})();

