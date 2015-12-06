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
      link: link,
      restrict: 'E',
      scope: {}
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();

