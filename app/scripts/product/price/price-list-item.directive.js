/**
 * Created by wermerbalazs on 19/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('priceListItem', priceListItem);

  priceListItem.$inject = [];

  /* @ngInject */
  function priceListItem() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/product/price/price-list-item.template.html',
      controller: 'PriceListItemController',
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        p: '=priceListItem',
        i: '=priceListItemIndex'
      }
    };
    return directive;

  }

})();

