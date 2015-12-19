/**
 * Created by wermerbalazs on 19/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PriceListController', PriceListController);

  PriceListController.$inject = ['productService'];

  /* @ngInject */
  function PriceListController(productService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = getProducts();
    }

    function getProducts() {
      return productService.getProducts();
    }
  }

})();

