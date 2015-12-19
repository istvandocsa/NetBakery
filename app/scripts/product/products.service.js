/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('productsService', productsService);

  productsService.$inject = ['firebaseService'];

  /* @ngInject */
  function productsService(firebaseService) {
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

