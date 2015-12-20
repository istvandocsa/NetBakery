/**
 * Created by NetHunter on 2015. 12. 06..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CurrentUserController', CurrentUserController);

  CurrentUserController.$inject = ['$rootScope', 'authenticator'];

  /* @ngInject */
  function CurrentUserController($rootScope, authenticator) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.logout = logout;

      vm.email = "";
      $rootScope.$on("credential.login.success", function(event, authData){;
        vm.email = authData.email;
      })
      $rootScope.$on("credential.logout", function(){;
        vm.email = "";
      })
    }

    function logout(){
      authenticator.logout();
    }

  }

})();

