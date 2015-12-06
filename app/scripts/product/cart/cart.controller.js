/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartController', CartController);

  CartController.$inject = ['$modal', 'modalService'];

  /* @ngInject */
  function CartController($modal, modalService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.showModal = modalService.showModal;
    }

  }

})();

