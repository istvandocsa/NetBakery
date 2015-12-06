/**
 * Created by NetHunter on 2015. 12. 06..
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authenticator', '$log'];

  /* @ngInject */
  function LoginController(authenticator, $log) {
    var vm = this;
    vm.login = login;

    activate();

    ////////////////

    function activate() {
    }

    function login(){
      $log.info("login called.");
    }


  }

})();
