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
  NavigationController.$inject = ['$location', '$log', 'firebaseService'];

  /* @ngInject */
  function NavigationController($stateProvider, $log, firebaseService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.brand = 'NetBakery';
      vm.activeState = getActiveState;

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
          name: 'Raktár',
          state: 'stock',
          simpleType: true
        },
        {
          name: 'Kimutatás készítése',
          simpleType: false,
          state: 'report',
          subStates: [
            {state : 'popularItems' , name : 'Népszerű termékek'},
            {state : 'popularIngredients', name : 'Népszerű alapanyagok' }
          ]
        }
      ];
    }

    function getActiveState(){
      return $stateProvider.activeState();
    }
  }

})();


