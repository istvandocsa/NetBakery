/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['cartService'];

  /* @ngInject */
  function ProductController(cartService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.amountToAdd = 0;
      vm.clickOnAdd = clickOnAdd;
    }

    function clickOnAdd() {
      if (vm.amountToAdd > 0) {
        var order = {name: vm.object.name, price: vm.object.price, amount: vm.amountToAdd};
        cartService.addToCart(order);
        vm.amountToAdd = 0;
      }
    }

  }

})();

