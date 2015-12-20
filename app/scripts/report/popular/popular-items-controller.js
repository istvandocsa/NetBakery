(function () {
  'use strict';

  angular
    .module('app')
    .controller('PopularItemsController', PopularItemsController);

  PopularItemsController.$inject = ['orderService', 'productService'];

  function PopularItemsController(orderService, productService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      var orders = orderService.getOrders();

      orders.$loaded().then( function(orders) {

        var map = [];
        vm.labels =  [];
        vm.data =  [];

        angular.forEach(orders, function(order) {

          var products = order.products;

          for( var i = 0; i < products.length; ++i ) {

            var productId = products[i]["productId"];
            var quantity =  products[i]["quantity"];

            if( containsKey(map, productId) ) {

              var position = getPosition(map, productId);

              map[position].quantity += quantity;

            } else {
              var object = new Object();
              object.productId = productId;
              object.quantity = quantity;
              map.push(object);
            }
          }

        });

        map.forEach( function( value ) {

          getProductById(value.productId).$loaded().then( function(product) {
            vm.labels.push(product.name);
            vm.data.push( value.quantity );
          });

        });

      });
    }

    function getPosition(map, key) {
      var result = 0;

      map.forEach( function( value, i ) {
        if( value.productId === key ) {
          result = i;
        }
      });
      return result;
    }

    function getProductById(id) {
      return productService.getProductById(id);
    }

    function containsKey(map, key) {

      var result = false;

      map.forEach( function( value ) {
        if( value.productId === key ) {
          result = true;
        }
      });
      return result;
    }

  }

})();
