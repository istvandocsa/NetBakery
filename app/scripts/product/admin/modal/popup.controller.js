/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PopupController', PopupController);

  /* @ngInject */
  function PopupController($uibModalInstance, items) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.product = items.product.name;
      vm.cancel = cancel;
      vm.delete = deleteProduct;
    }

    function cancel(){
      $uibModalInstance.close();
    }

    function deleteProduct(){
      $uibModalInstance.close();
      items.product.$remove();
    }
  }

})();

