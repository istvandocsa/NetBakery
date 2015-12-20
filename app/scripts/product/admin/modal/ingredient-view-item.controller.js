/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('IngredientViewItemController', IngredientViewItemController);

  IngredientViewItemController.$inject = ['$rootScope'];

  /* @ngInject */
  function IngredientViewItemController($rootScope) {
    var vm = this;
    vm.title = 'IngredientViewItemController';

    activate();

    ////////////////

    function activate() {
      vm.remove = remove;
    }

    function remove() {
      $rootScope.$emit('remove.ingredient', vm.item.id);
    }
  }

})();

