/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('productService', productService);

  productService.$inject = ['firebaseService'];

  /* @ngInject */
  function productService(firebaseService) {
    var service = {
      getProducts: getProducts
    };
    return service;

    ////////////////

    function getProducts() {
      return firebaseService.getArray('products');
    }
  }

})();

