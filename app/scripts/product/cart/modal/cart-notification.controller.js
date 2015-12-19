/**
 * Created by wermerbalazs on 19/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartNotificationController', CartNotificationController);

  /* @ngInject */
  function CartNotificationController($uibModalInstance, $rootScope, items) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.message = items.message;
      vm.close = closeModal;
    }

    function closeModal() {
      $uibModalInstance.close();
      $rootScope.$emit('notification.closed');
    }
  }

})();

