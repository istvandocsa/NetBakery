/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('cart', cart);

  cart.$inject = [];

  /* @ngInject */
  function cart() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/product/cart/cart.template.html',
      controller: 'CartController',
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

