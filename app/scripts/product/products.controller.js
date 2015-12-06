/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['productsService', '$log'];

  /* @ngInject */
  function ProductsController(productsService, $log) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = productsService.getProducts();
      $log.debug(vm.products);
    }
  }

})();

