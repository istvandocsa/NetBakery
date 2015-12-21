/**
 * Created by wermerbalazs on 21/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('IngredientController', IngredientController);

  IngredientController.$inject = ['firebaseService'];

  /* @ngInject */
  function IngredientController(firebaseService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.ingredients = firebaseService.getArray('/ingredients');
      vm.save = save;
    }

    function save(){
      firebaseService.saveObject('/ingredients', {minQuantity: vm.quantity, name: vm.name});
    }

  }

})();

