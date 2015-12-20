/**
 * Created by NetHunter on 2015. 12. 19..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('StockController', StockController);

  StockController.$inject = ['$log', '$rootScope', '$filter', 'firebaseService', 'modalService'];

  /* @ngInject */
  function StockController($log, $rootScope, $filter, firebaseService, modalService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      console.log("cica");
      vm.currentDate = new Date();

      vm.openStockOrder = openStockOrder;

      $rootScope.$on("stock-item-dispose", handleItemDispose);
      $rootScope.$on("stock-order-finish", handleStockOrder);

      firebaseService.getArray("/stock").$loaded().then(function(items){
        vm.stock = items;
      });

      function handleItemDispose(event, id){
        $log.info("Disposing stock entry with the following id: " + id);
        var toRemove = $filter('filter')(vm.stock, function(element){
          return element.$id === id;
        })[0];
        vm.stock.$remove(toRemove);
        $log.debug(vm.stock.length);
      }

      function openStockOrder(){
        modalService.show("scripts/ingredient/stock/order/stock-order.template.html", "StockOrderController", "lg");
      }

      function handleStockOrder(event, order){
        $log.info("Received order request. {}", order);
        firebaseService.getArray("/stock").$loaded().then(function(stock){
          angular.forEach(order, function(item){
            var orderItem = {expiryDate: item.expiryDate.toISOString(), ingredientId: item.id, quantity: item.quantity};
            $log.info("Adding order item into stock. {}", orderItem);
            stock.$add(orderItem);
          });
          stock.$save();
        });
      }
    }
  }
})();


