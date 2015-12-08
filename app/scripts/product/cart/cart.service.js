/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('cartService', cartService);

  cartService.$inject = ['$log'];

  /* @ngInject */
  function cartService($log) {
    var cart = [];
    var service = {
      add: add,
      addOne: addOne,
      removeOne: removeOne,
      remove: remove,
      clear: clear,
      getCart: getCart
    };
    return service;

    ////////////////

    function add(obj) {
      var contains = false;
      $.each(cart, function () {
        if ($(this)[0].name == obj.name) {
          $log.info('Cart already contains the product. Adding amount.');
          $(this)[0].amount += obj.amount;
          contains = true;
        }
      });

      if (!contains) {
        cart.push(obj);
        $log.info('Added product: ', obj);
      }
      console.log(cart);
    }

    function addOne(obj) {
      $.each(cart, function () {
        if (obj.name == $(this)[0].name) {
          $(this)[0].amount++;
          $log.info('Increased product amount by one. Product:', $(this)[0]);
        }
      });

    }

    function removeOne(obj) {
      $.each(cart, function () {
        if (obj.name == $(this)[0].name) {
          $(this)[0].amount--;
          $log.info('Decreased product amount by one. Product:', $(this)[0]);
        }
      });
    }

    function remove(obj) {
      var index = cart.indexOf(obj);
      cart.splice(index, 1);
      $log.info('Removed product from cart. Product:', obj);
    }

    function clear() {
      cart = [];
      $log.info('Emptied cart.');
    }

    function getCart() {
      $log.info('Getting cart content.');
      return cart;
    }
  }

})();

