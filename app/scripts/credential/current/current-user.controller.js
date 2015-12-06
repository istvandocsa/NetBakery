/**
 * Created by NetHunter on 2015. 12. 06..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CurrentUserController', CurrentUserController);

  CurrentUserController.$inject = ['$rootScope'];

  /* @ngInject */
  function CurrentUserController($rootScope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.email = "";
      $rootScope.$on("credential.login.success", function(event, authData){;
        vm.email = authData.email;
      })
    }

  }

})();

