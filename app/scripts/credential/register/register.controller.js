/**
 * Created by István on 10/12/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$log', 'authenticator', 'loadOverlay', '$rootScope',  '$state'];

  /* @ngInject */
  function RegisterController($log, authenticator, loadOverlay, $rootScope, $state) {
    var vm = this;
    vm.registerForm;
    vm.register = register;

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

    function handleRegisterSuccess(){
      $log.info("Register success!!");
      authenticator.authenticate({email: vm.registerForm.email, password: vm.registerForm.password}).then(function(){
        loadOverlay.off();
        $state.go('home');
      });
    }

    function handleRegisterFail(){
      $log.info("Register fail!!");
      loadOverlay.off();
    }
  }

})();

