/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['productsService'];

  /* @ngInject */
  function ProductsController(productsService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = productsService.getProducts();
    }
  }

})();

