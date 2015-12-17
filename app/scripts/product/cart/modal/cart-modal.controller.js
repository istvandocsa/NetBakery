/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartModalController', CartModalController);

  CartModalController.$inject = ['$uibModalInstance'];

  /* @ngInject */
  function CartModalController($uibModalInstance) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.ok = ok;
      vm.cancel = cancel;
    }

    function cancel() {
      $uibModalInstance.dismiss();
    }

    function ok() {
      $uibModalInstance.close();
    }

  }

})();

