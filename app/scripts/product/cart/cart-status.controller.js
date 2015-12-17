/**
 * Created by wermerbalazs on 09/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartStatusController', CartStatusController);

  CartStatusController.$inject = ['modalService', '$rootScope'];

  /* @ngInject */
  function CartStatusController(modalService, $rootScope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      $rootScope.$on('cart.add',  cartSize);
      vm.cartSize = 0;
      vm.showCartModal = showCartModal;
    }

    function cartSize(event, data){
      vm.cartSize=data;
    }

    function showCartModal(){
      modalService.show("scripts/product/cart/modal/cart-modal.template.html", "CartModalController");
    }
  }

})();

