/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$rootScope'];

  /* @ngInject */
  function ProductController($rootScope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.amountToAdd = 0;
      vm.clickOnAdd = clickOnAdd;
    }

    function clickOnAdd(){
      $rootScope.$emit('product.to.cart', {name: vm.object.name, amount: vm.amountToAdd});
    }

  }

})();

