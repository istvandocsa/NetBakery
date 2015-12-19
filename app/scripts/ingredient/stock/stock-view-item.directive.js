/**
 * Created by NetHunter on 2015. 12. 19..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('stockViewItem', stockViewItem);

  stockViewItem.$inject = [];

  /* @ngInject */
  function stockViewItem() {
    var directive = {
      controller: StockViewItemController,
      templateUrl: 'scripts/ingredient/stock/stock-view-item.template.html',
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'EA',
      scope: {
        item: "=stockViewItem",
        index: "="
      }
    };
    return directive;

  }

  StockViewItemController.$inject = ['$log', '$rootScope', 'firebaseService'];

  /* @ngInject */
  function StockViewItemController($log, $rootScope, firebaseService) {
    var vm = this;

    activate();

    function activate(){
      vm.dispose = dispose;

      vm.expired = isExpired(vm.item.expiryDate);
      firebaseService.getObject("/ingredients/" + vm.item.ingredientId + "/name").$loaded().then(function(name){
        vm.item.name = name;
      });
    }

    function dispose(){
      $log.info("requesting delete for element: " + vm.item.$id);
      $rootScope.$emit("stock-item-dispose", vm.item.$id);
    }

    function isExpired(expiry){
      var currentDate = new Date();
      var expiryDate = new Date(expiry);

      return currentDate > expiryDate;
    }
  }

})();

