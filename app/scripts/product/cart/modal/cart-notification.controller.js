/**
 * Created by wermerbalazs on 19/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartNotificationController', CartNotificationController);

  CartNotificationController.$inject = ['$uibModalInstance', '$rootScope'];

  /* @ngInject */
  function CartNotificationController($uibModalInstance, $rootScope) {
    var vm = this;
    var shoppingSuccess;

    activate();

    ////////////////

    function activate() {
      vm.message = setup();
      vm.close = closeModal;
    }

    function setup() {
      var fate = Math.floor((Math.random() * 3));
      if (fate % 2 != 0) {
        shoppingSuccess = false;
        return 'Sikertelen fizetés!';
      } else {
        shoppingSuccess = true;
        return 'Sikeres fizetés!';
      }
    }

    function closeModal() {
      $uibModalInstance.close();
      $rootScope.$emit('notification.closed', shoppingSuccess);
    }
  }

})();

