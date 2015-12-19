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

        var map = new Array();
        vm.labels =  new Array();
        vm.data =  new Array();

        angular.forEach(orders, function(order) {

          var products = order.products;

          for( var i = 0; i < products.length; ++i ) {

            var productId = products[i]["productId"];
            var quantity =  products[i]["quantity"];

            if( containsKey(map, productId) ) {

              var position = getPosition(map, productId);

              var object = map.pop(position);

              object.productId = productId;
              object.quantity += quantity;

              map.push(object);

            } else {
              var object = new Object();
              object.productId = productId;
              object.quantity = quantity;
              map.push(object);
            }
          }

        });

        map.forEach( function( value ) {

          getName(value.productId).$loaded().then( function(product) {
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

    function getName(id) {
      return productService.getProductById(id);
    }

    function containsKey(map, key) {

      var result = false;

      map.forEach( function( value ) {
        if( value.productId === key ) {
          console.log("havekey " + key);
          result = true;
        }
      });
      return result;
    }

  }

})();
