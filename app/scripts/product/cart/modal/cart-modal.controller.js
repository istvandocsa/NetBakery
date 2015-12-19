/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartModalController', CartModalController);

  CartModalController.$inject = ['$uibModalInstance', 'cartService', 'uibDatepickerConfig', '$log', 'modalService', '$rootScope', 'firebaseService', '$filter'];

  /* @ngInject */
  function CartModalController($uibModalInstance, cartService, uibDatepickerConfig, $log, modalService, $rootScope, firebaseService, $filter) {
    var vm = this;
    var date = new Date();
    var ingredients;
    var stock;

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
      getIngredients();
      getStock().then(function () {
        console.log('cica');
        console.log(stock);
        if (hasEnoughIngredients()) {
          angular.forEach(ingredients, function (ingredient) {

            firebaseService.updateObject('/stock/' + ingredient.$id, {quantity: -ingredient.quantity});
          });
          modalService.show('scripts/product/cart/modal/notification.template.html', 'CartNotificationController', 'sm', {message: vm.items});
          $log.info('OMG he is going for it!!!! For real real, not just for play play.');
        }
      });
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
      if (data) {
        cartService.clear();
      }
      closeModal();
    }

    function setup() {
      if (date.getHours() >= 12) {
        date.setDate(date.getDate() + 1);
      }
      uibDatepickerConfig.minDate = date;
    }

    function hasEnoughIngredients() {
      var stockItem;
      angular.forEach(ingredients, function (ingredient) {
        stockItem = $filter('filter')(stock, function (item) {
          return item.ingredientId === ingredient.ingredientId;
        });

        if (stockItem[0].quantity < ingredient.quantity) {
          return false;
        }
      });
      return true;
    }

    function getIngredients() {
      ingredients = [];
      angular.forEach(vm.products, function (product) {
        angular.forEach(product.ingredients, function (item) {
          var ingredient = $filter('filter')(ingredients, function (ing) {
            return ing.ingredientId === item.ingredientId;
          });
          if (ingredient.length == 0) {
            ingredients.push(item);
          } else {
            ingredient[0].quantity += item.quantity;
          }
        });
      });
    }

    function getStock() {
      var today = new Date();
      return firebaseService.getArray('/stock').$loaded().then(function (data) {
        stock = $filter('filter')(data, function (item) {
          return today <= new Date(item.expiryDate);
        });
      });
    }

  }

})();

