/**
 * Created by Andras on 2015.12.19..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PopularIngredientsController', PopularIngredientsController);

  PopularIngredientsController.$inject = ['orderService', 'productService', 'firebaseService', '$filter'];

  function PopularIngredientsController(orderService, productService, firebaseService, $filter) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

      orderService.getOrders().$loaded().then(function (orders) {

        productService.getProducts().$loaded().then(function (products) {

          firebaseService.getArray('ingredients').$loaded().then(function (ingredients) {
            execute(orders, products, ingredients);
          });

        });

      });

    }

    function execute(orders, products, ingredients) {

      var map = [];

      angular.forEach(orders, function (order) {

        var productsOfOrder = order.products;

        angular.forEach(productsOfOrder, function (productOfOrder) {

          var productId = productOfOrder.productId;
          var NumberOfProductsOrdered = productOfOrder.quantity;

          var product = getProductFromArray(productId, products);

          var productIngredients = product.ingredients;

          for (var k = 0; k < productIngredients.length; ++k) {

            var ingredientId = productIngredients[k].ingredientId;
            var ingredientsUsedToMakeProduct = productIngredients[k].quantity;

            var ingredient = getIngredientFromArray(ingredientId, ingredients);

            addToMap(map, ingredient.name, NumberOfProductsOrdered * ingredientsUsedToMakeProduct);

            var sortedArray = $filter('orderBy')(map, "quantity", true);

            vm.labels = [];
            vm.data = [];

            for (var i = 0; i < sortedArray.length && i < 10; ++i) {
              vm.labels.push(sortedArray[i].name);
              vm.data.push(sortedArray[i].quantity);
            }
          }

        });

      });

    }

    function addToMap(map, name, quantity) {

      if (containsName(map, name)) {

        var position = getPosition(map, name);

        map[position].quantity += quantity;

      } else {
        var newObject = [];
        newObject.name = name;
        newObject.quantity = quantity;
        map.push(newObject);
      }
    }

    function containsName(map, name) {

      var result = false;

      map.forEach(function (value) {
        if (value.name === name) {
          result = true;
        }
      });
      return result;
    }

    function getPosition(map, name) {
      var result = -1;

      map.forEach(function (value, i) {
        if (value.name === name) {
          result = i;
        }
      });
      if( result === -1 ) {
        throw "Position not found for " + name;
      } else {
        return result;
      }
    }

    function getIngredientFromArray(ingredientId, ingredients) {

      for (var i = 0; i < ingredients.length; ++i) {

        if (ingredients[i].$id === ingredientId) {
          return ingredients[i];
        }
      }
      throw "IngredientId " + ingredientId + " not found!";
    }

    function getProductFromArray(productId, products) {

      for (var i = 0; i < products.length; ++i) {

        if (products[i].$id === productId) {
          return products[i];
        }

      }
      throw "ProductId " + productId + " not found!";
    }
  }

})();
