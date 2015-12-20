/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartModalController', CartModalController);

  CartModalController.$inject = ['$uibModalInstance', 'cartService', 'uibDatepickerConfig', '$log', 'modalService', '$rootScope', 'firebaseService', '$filter', 'authenticator'];

  /* @ngInject */
  function CartModalController($uibModalInstance, cartService, uibDatepickerConfig, $log, modalService, $rootScope, firebaseService, $filter, authenticator) {
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
      vm.pickUps = getPickUps();
      vm.checkout = checkout;
      vm.getTotal = totalPrice;
      vm.deliveryDate = date;
      vm.openCalendar = openCalendar;
      vm.isCalendarOpened = false;
      vm.deliveryTime = date;
      $rootScope.$on('notification.closed', finishShopping);
    }

    function checkout() {
      var msg;
      getIngredients();

      getStock().then(function () {
        hasEnoughIngredients()
     /*   if (hasEnoughIngredients()) {
          var amount;
          angular.forEach(ingredients, function (ingredient) {
            amount = ingredient.quantity;
            angular.forEach(stock, function (item) {
              if (item.ingredientId === ingredient.ingredientId) {
                firebaseService.getObject('/stock/' + item.$id).$loaded().then(function (stockItem) {
                  if (stockItem.quantity <= amount) {
                    amount -= stockItem.quantity;
                    stockItem.$remove();
                  } else {
                    stockItem.quantity -= amount;
                    stockItem.$save();
                    return true;
                  }
                });
              }
            });
          });
          msg = 'Sikeres vásárlás!';
          saveOrder();
          $log.info('OMG he is going for it!!!! For real real, not just for play play.');
        } else {
          msg = 'Sikertelen vásárlás!';
        }
        modalService.show('scripts/product/cart/modal/notification.template.html', 'CartNotificationController', 'sm', {message: msg});*/
      });
    }

    function getPickUps() {
      return [
        {city: 'Budapest'},
        {city: 'Debrecen'},
        {city: 'Szeged'},
        {city: 'Sopron'},
        {city: 'Pécs'},
        {city: 'Békéscsaba'}
      ];

    }

    function saveOrder() {
      var products = [];
      angular.forEach(vm.products, function (prod) {
        products.push({productId: prod.id, quantity: prod.amount});
      });
      var order = {
        deliveryDate: vm.deliveryDate.toISOString(),
        products: products,
        timestamp: new Date().toISOString(),
        userId: authenticator.currentUser().uid
      };
      $log.info('Saving order.', order);
      firebaseService.saveObject('/orders', order);
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
      var allowToOrder = true;
      var result = getStockSum();
      angular.forEach(ingredients, function (ingredient) {
        stockItem = $filter('filter')(result, function (item) {
          return item.ingredientId === ingredient.ingredientId;
        });

        if (stockItem.length == 0 || stockItem[0].quantity < ingredient.quantity) {
          allowToOrder = false;
          return allowToOrder;
        }
      });
      return allowToOrder;
    }

    function getIngredients() {
      ingredients = [];
      var ingredient;
      var array = angular.copy(vm.products);
      angular.forEach(array, function (product) {
        angular.forEach(product.ingredients, function (item) {
          ingredient = $filter('filter')(ingredients, function (ing) {
            return ing.ingredientId === item.ingredientId;
          });
          item.quantity *= product.amount;
          if (ingredient.length == 0) {
            ingredients.push(item);
          } else {
            ingredient[0].quantity += item.quantity;
          }
        });
      });
    }

    function getStockSum() {
      var stockItem;
      var result = [];
      angular.forEach(stock, function (item) {
        stockItem = $filter('filter')(result, function (obj) {
          return obj.ingredientId === item.ingredientId;
        });
        if (stockItem.length == 0) {
          result.push(item);
        } else {
          stockItem[0].quantity += item.quantity;
        }
      });
      return result;
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

