/**
 * Created by Andras
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('orderService', orderService);

  orderService.$inject = ['firebaseService'];

  function orderService(firebaseService) {
    var service = {
      getOrders: getOrders
    };
    return service;

    ////////////////

    function getOrders() {
      return firebaseService.getArray('orders');
    }
  }

})();
