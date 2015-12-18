/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartModalController', CartModalController);

  CartModalController.$inject = ['$uibModalInstance', 'cartService', 'uibDatepickerConfig', '$log'];

  /* @ngInject */
  function CartModalController($uibModalInstance, cartService, uibDatepickerConfig, $log) {
    var vm = this;
    var date = new Date();

    activate();

    ////////////////

    function activate() {
      uibDatepickerConfig.minDate = date;
      vm.close = closeModal;
      vm.products = cartService.getCart();
      vm.removeOne = removeOneItem;
      vm.addOne = addOneItem;
      vm.remove = removeItem;
      vm.pickUps = getPickUps;
      vm.checkout = checkout;
      vm.getTotal = totalPrice;
      vm.deliveryDate = date;
      vm.openCalendar = openCalendar;
      vm.isCalendarOpened = false;
      vm.deliveryTime = date;
    }

    function checkout() {
      //shit just get real
      //closeModal();
      //cartService.clear();
      $log.info('OMG he is going for it!!!! For real real, not just for play play.');
    }

    function getPickUps() {
      //insert voodoo magic here
      $log.info('Loaded pickups.');
    }

    function removeOneItem(product) {
      cartService.removeOne(product);
    }

    function addOneItem(product) {
      cartService.addOne(product);
    }

    function removeItem(product) {
      cartService.remove(product);
    }

    function closeModal() {
      $uibModalInstance.close();
      $log.info('Cart modal has been closed.');
    }

    //This is being called three times i have no clue why
    function totalPrice() {
      var total = 0;
      angular.forEach(vm.products, function (product) {
        total += product.price * product.amount;
      });
      $log.debug('Counting total');
      return total;
    }

    function openCalendar() {
      vm.isCalendarOpened = true;
      $log.info('Calendar has been opened.');
    }

  }

})();

