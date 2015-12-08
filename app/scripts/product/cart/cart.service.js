/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('cartService', cartService);

  cartService.$inject = ['$log', '$filter'];

  /* @ngInject */
  function cartService($log, $filter) {
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
      var product = $filter('filter')(cart, obj.name);

      if (product.length == 0) {
        cart.push(obj);
        $log.info('Added product: ', obj);
      } else {
        product[0].amount += obj.amount;
        $log.info('Already in cart. New amount: ', product[0].amount);
      }
    }

    function addOne(obj) {
      var product = $filter('filter')(cart, obj.name)[0];
      product.amount++;
      $log.info('Increased product amount by one. Product:', product);
    }

    function removeOne(obj) {
      var product = $filter('filter')(cart, obj.name)[0];
      product.amount--;
      $log.info('Decreased product amount by one. Product:', product);
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
