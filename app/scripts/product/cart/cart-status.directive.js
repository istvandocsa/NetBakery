/**
 * Created by wermerbalazs on 09/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('cartStatus', cartStatus);

  cartStatus.$inject = [];

  /* @ngInject */
  function cartStatus() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/product/cart/cart-status.template.html',
      controller: 'CartStatusController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;
  }


})();

