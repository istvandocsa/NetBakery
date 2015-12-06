/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('product', productDirective);

  productDirective.$inject = [];

  /* @ngInject */
  function productDirective() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/product/product.template.html',
      controller: 'ProductController',
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
        object : "="
      }
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();

