/**
 * Created by Andras on 2015.12.20..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('NeverUsedIngredientsController', NeverUsedIngredientsController);

  NeverUsedIngredientsController.$inject = ['orderService', 'productService', 'firebaseService'];

  function NeverUsedIngredientsController(orderService, productService, firebaseService) {
    var vm = this;
    vm.neverUsedIngredientsList = [];
    activate();

    ////////////////

    function activate() {

      orderService.getOrders().$loaded().then(function (orders) {

        productService.getProducts().$loaded().then(function (products) {

          firebaseService.getArray('ingredients').$loaded().then(function (ingredients) {
            vm.neverUsedIngredientsList = getNeverUsedIngredientsList(orders, products, ingredients);
            vm.hasItems = vm.neverUsedIngredientsList.length > 0;
          });

        });

      });

    }

    function getNeverUsedIngredientsList(orders, products, ingredients) {

      var usedIngredientIdsList = [];
      var neverUsedIngredientsList = [];

      angular.forEach(orders, function (order) {

        var productsOfOrder = order.products;

        angular.forEach(productsOfOrder, function (productOfOrder) {

          var productId = productOfOrder.productId;
          var product = getProductFromArray(productId, products);

          var productIngredients = product.ingredients;

          for (var k = 0; k < productIngredients.length; ++k) {
            var ingredientId = productIngredients[k].ingredientId;
            usedIngredientIdsList.push(ingredientId);
          }

          angular.forEach(ingredients, function (ingredient) {

            if (!listContainsId(ingredient.$id, usedIngredientIdsList)) {

              if (!existsInMap(ingredient, neverUsedIngredientsList)) {
                neverUsedIngredientsList.push(ingredient);
              }
            }

          });
        });
      });
      return neverUsedIngredientsList;
    }

    function existsInMap(ingredient, map) {
      var id = ingredient.$id;

      for (var i = 0; i < map.length; ++i) {
        if (map[i].$id === id) {
          return true;
        }
      }
      return false;
    }

    function listContainsId(id, usedIngredientIdsList) {
      for (var i = 0; i < usedIngredientIdsList.length; ++i) {
        if (usedIngredientIdsList[i] === id) {
          return true;
        }
      }
      return false;
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
