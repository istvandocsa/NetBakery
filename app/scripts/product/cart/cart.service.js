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
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      clearCart: clearCart,
      getCart: getCart
    };
    return service;

    ////////////////

    function addToCart(obj) {
      cart.push(obj);
      $log.debug(cart);
    }

    function removeFromCart(obj) {
      cart = $.grep(cart, function (value) {
        return value != obj;
      });
    }

    function clearCart(){
      cart = [];
    }

    function getCart() {
      return cart;
    }
  }

})();

