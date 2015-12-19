/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartModalController', CartModalController);

  CartModalController.$inject = ['$uibModalInstance', 'cartService', 'uibDatepickerConfig', '$log', 'modalService', '$rootScope'];

  /* @ngInject */
  function CartModalController($uibModalInstance, cartService, uibDatepickerConfig, $log, modalService, $rootScope) {
    var vm = this;
    var date = new Date();
    var notification;

    activate();

    ////////////////

    function activate() {
setup();
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
      $rootScope.$on('notification.closed', finishShopping);
    }

    function checkout() {
      notification = modalService.show('scripts/product/cart/modal/notification.template.html', 'CartNotificationController', 'sm');
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

    function totalPrice() {
      var total = 0;
      angular.forEach(vm.products, function (product) {
        total += product.price * product.amount;
      });
      return total;
    }

    function openCalendar() {
      vm.isCalendarOpened = true;
      $log.info('Calendar has been opened.');
    }

    function finishShopping(event, data) {
      if(data){
        cartService.clear();
      }
      closeModal();
    }

    function setup(){
      if(date.getHours() >= 12){
         date.setDate(date.getDate() + 1);
      }
      uibDatepickerConfig.minDate = date;
    }
  }

})();

