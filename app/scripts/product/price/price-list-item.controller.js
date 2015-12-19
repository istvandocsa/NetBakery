/**
 * Created by wermerbalazs on 19/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PriceListItemController', PriceListItemController);

  PriceListItemController.$inject = ['firebaseService'];

  /* @ngInject */
  function PriceListItemController(firebaseService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.save = save;
    }

    function save() {
      var url = '/products/' + vm.p.$id;
      var product = firebaseService.getObject(url);
      product.price = vm.p.price;
    }
  }

})();

