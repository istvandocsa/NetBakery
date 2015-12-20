/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductEditorController', ProductEditorController);

  /* @ngInject */
  function ProductEditorController($uibModalInstance, items, firebaseService, $rootScope, $filter) {
    var vm = this;
    /* vm.selectedIngredient;
     vm.amount;*/

    activate();

    ////////////////

    function activate() {
      vm.product = items.product;
      firebaseService.getArray("/ingredients").$loaded().then(function (ingredients) {
        vm.ingredients = ingredients;
      });
      vm.productIngredients = getProductIngredients();
      $rootScope.$on('remove.ingredient', removeItem);
      vm.add = add;
    }

    function getProductIngredients() {
      var ingredients = [];
      var name;
      angular.forEach(vm.product.ingredients, function (item) {
        name = firebaseService.getObject("/ingredients/" + item.ingredientId + '/name');
        ingredients.push({id: item.ingredientId, name: name, quantity: item.quantity});
      });
      return ingredients;
    }

    function removeItem(event, data) {
      var result = [];
      firebaseService.getArray('/products/' + vm.product.$id + '/ingredients/').$loaded().then(function (items) {
        angular.forEach(items, function (item) {
          if (item.ingredientId != data) {
            result.push({ingredientId: item.ingredientId, quantity: item.quantity});
          }
        });
        vm.productIngredients = result;
        firebaseService.updateArray('/products/' + vm.product.$id + '/ingredients/', result);
      });
    }

    function add() {
      var item = {ingredientId: vm.selectedIngredient, quantity: vm.selectedIngredientAmount};
      firebaseService.getArray('/products/' + vm.product.$id + '/ingredients/').$loaded().then(function (items) {
        items.$add(item);
      });
    }
  }

})();

