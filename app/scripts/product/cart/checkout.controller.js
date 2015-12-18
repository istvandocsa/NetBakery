/**
 * Created by wermerbalazs on 08/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['cartService'];

  /* @ngInject */
  function CheckoutController(cartService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.orders = cartService.getCart();
    }
  }

})();

