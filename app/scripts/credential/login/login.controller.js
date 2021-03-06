/**
 * Created by NetHunter on 2015. 12. 06..
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authenticator', '$log', '$state'];

  /* @ngInject */
  function LoginController(authenticator, $log, $state) {
    var vm = this;
    vm.login;
    vm.loginForm;

    activate();

    ////////////////

    function activate() {
      vm.login = login;
      vm.loginForm = {};
    }

    function login(){
      $log.debug("Logging in with " + vm.loginForm.email);
      authenticator.authenticate(vm.loginForm).then(function(){
        $state.go('home');
      });
    }


  }

})();
