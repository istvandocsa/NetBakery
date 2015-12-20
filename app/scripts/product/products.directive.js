(function () {
  'use strict';

  angular
    .module('app')
    .directive('products', products);

  products.$inject = [];

  /* @ngInject */
  function products() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/product/products.template.html',
      controller: 'ProductsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;
  }
})();

