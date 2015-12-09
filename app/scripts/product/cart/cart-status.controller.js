/**
 * Created by wermerbalazs on 09/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CartStatusController', CartStatusController);

  CartStatusController.$inject = ['$rootScope'];

  /* @ngInject */
  function CartStatusController($rootScope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      $rootScope.$on('cart.add',  cartSize);
      vm.cartSize = 0;
    }

    function cartSize(event, data){
      vm.cartSize=data;
    }
  }

})();

