/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductEditorController', ProductEditorController);

  /* @ngInject */
  function ProductEditorController($uibModalInstance, items, firebaseService, $rootScope) {
    var vm = this;

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
      vm.update = update;
      vm.save = save;
      vm.isNew = items.isNew;
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

      var name = firebaseService.getObject("/ingredients/" + item.ingredientId + '/name');

      vm.productIngredients.push({
        name: name,
        ingredientId: vm.selectedIngredient,
        quantity: vm.selectedIngredientAmount
      });
    }

    function update() {
      firebaseService.getObject('/products/' + vm.product.$id).$loaded().then(function (product) {
        product.name = vm.product.name;
        product.price = vm.product.price;
        product.url = vm.product.url;
        product.$save();
        $uibModalInstance.close();
      });
    }

    function save(){
      firebaseService.getArray('/products').$loaded().then(function (products) {
        var product = {ingredients: [], name: vm.product.name, price: vm.product.price, url: vm.product.url};
        products.$add(product);
        $uibModalInstance.close();
      });
    }
  }

})();

