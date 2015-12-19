/**
 * Created by NetHunter on 2015. 12. 19..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('StockController', StockController);

  StockController.$inject = ['$log', '$rootScope', '$filter', 'firebaseService'];

  /* @ngInject */
  function StockController($log, $rootScope, $filter, firebaseService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.currentDate = new Date();

      $rootScope.$on("stock-item-dispose", handleItemDispose);

      firebaseService.getArray("/stock").$loaded().then(function(items){
        console.log(items);
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

    }
  }
})();


