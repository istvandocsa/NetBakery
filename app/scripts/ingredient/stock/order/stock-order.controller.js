/**
 * Created by NetHunter on 2015. 12. 19..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('StockOrderController', StockOrderController);

  /* @ngInject */
  function StockOrderController($rootScope, $uibModalInstance, $log, $filter, firebaseService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.addedOrders = [];
      vm.current = {};
      firebaseService.getArray("/ingredients").$loaded().then(function(ingredients){
        vm.ingredients = ingredients;
      });

      vm.addNewOrderItem = addNewOrderItem;
      vm.close = close;
    }

    function addNewOrderItem(){
      var ingredient = $filter('filter')(vm.ingredients, function(current){
        return current.$id === vm.current.id;
      })[0];
      vm.current.name = ingredient.name;
      $log.info("Adding ingredient to order list. {}", vm.current);
      vm.addedOrders.push(angular.copy(vm.current));
    }

    function close(){
      $rootScope.$emit("stock-order-finish", vm.addedOrders);
      $uibModalInstance.close();
    }

  }

})();

