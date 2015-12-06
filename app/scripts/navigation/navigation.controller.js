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
  NavigationController.$inject = ['$location'];

  /* @ngInject */
  function NavigationController($stateProvider) {
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
            {state : 'popular' , name : 'Népszerű termékek'},
            {state : 'neverUser', name : 'Sohasem használt termékek'},
            {state : 'ingredientsOrders' , name : 'Alapanyag rendelés'}
          ]
        }
      ];
    }

    function getActiveState(){
      return $stateProvider.activeState();
    }
  }

})();


