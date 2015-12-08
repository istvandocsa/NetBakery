(function () {
  'use strict';

  angular
    .module('app')
    .controller('NavigationController', NavigationController);

  /**
   * @ngdoc function
   * @name app.controller:NavigationController
   * @description
   * # MainCtrl
   * Controller of the Navbar on the top
   */
  NavigationController.$inject = ['$location', 'cartService', '$rootScope'];

  /* @ngInject */
  function NavigationController($stateProvider, cartService, $rootScope) {
    var vm = this;
    vm.title = 'NavigationController';
    vm.brand = 'NetBakery';
    vm.menuItems;
    vm.activeState = getActiveState;

    activate();

    ////////////////

    function activate() {
      vm.menuItems = [
        {
          name: 'Kezdőoldal',
          state: 'home',
          simpleType: true
        },
        {
          name: 'Belépés',
          state: 'credential',
          simpleType: true
        },
        {
          name: 'Kimutatás készítése',
          simpleType: false,
          subStates: [
            {state: 'popular', name: 'Népszerű termékek'},
            {state: 'neverUser', name: 'Sohasem használt termékek'},
            {state: 'ingredientsOrders', name: 'Alapanyag rendelés'}
          ]
        }
      ];
      vm.cartSize = cartSize();
      $rootScope.$on('product.addToCart', cartSize);
    }

    function getActiveState() {
      return $stateProvider.activeState();
    }

    function cartSize() {
      vm.cartSize = cartService.getCart().length;
    }
  }

})();


