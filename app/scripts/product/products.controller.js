/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['productsService', '$log', '$rootScope'];

  /* @ngInject */
  function ProductsController(productsService, $log, $rootScope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = productsService.getProducts();
      vm.cart = [];
      $rootScope.$on('product.to.cart', addToCart);
    }

    function addToCart(obj) {
      vm.cart.push(obj);
    }
  }

})();

