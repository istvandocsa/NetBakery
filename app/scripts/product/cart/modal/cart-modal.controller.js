/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartModalController', CartModalController);

  CartModalController.$inject = ['$uibModalInstance', 'cartService'];

  /* @ngInject */
  function CartModalController($uibModalInstance, cartService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.close = closeModal;
      vm.products = cartService.getCart();
      vm.removeOne = removeOneItem;
      vm.addOne = addOneItem;
      vm.remove = removeItem;
      vm.pickUps = getPickUps;
      vm.checkout = checkout;
    }

    function checkout(){
      //shit just get real
      //closeModal();
      //cartService.clear();
    }

    function getPickUps(){
      //insert voodoo magic here
    }

    function removeOneItem(product){
      cartService.removeOne(product);
    }

    function addOneItem(product){
      cartService.addOne(product);
    }

    function removeItem(product){
      cartService.remove(product);
    }

    function closeModal() {
      $uibModalInstance.close();
    }

  }

})();

