(function () {
  'use strict';

  angular
    .module('app')
    .directive('ingredientViewItem', ingredientViewItem);

  ingredientViewItem.$inject = [];

  /* @ngInject */
  function ingredientViewItem() {
    var directive = {
      controller: 'IngredientViewItemController',
      templateUrl: 'scripts/product/admin/modal/ingredient-view-item.template.html',
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'EA',
      scope: {
        item: "=ingredientViewItem",
        index: "=ingredientViewItemIndex"
      }
    };
    return directive;
  }

})();



