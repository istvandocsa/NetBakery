/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$rootScope', 'modalService', '$scope'];

  /* @ngInject */
  function ProductController($rootScope, modalService, $scope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.amountToAdd = 0;
      vm.t = function () {
        modalService.showModal($scope);
      }
      vm.clickOnAdd = clickOnAdd;
    }

    function clickOnAdd() {
      $rootScope.$emit('product.to.cart', {name: vm.object.name, amount: vm.amountToAdd});
      vm.amountToAdd = 0;
    }

  }

})();

