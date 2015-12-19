/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['productService'];

  /* @ngInject */
  function ProductsController(productService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = productService.getProducts();
    }
  }

})();

