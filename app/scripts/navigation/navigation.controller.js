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
          name: 'Home',
          state: 'home'
        },
        {
          name: 'Login',
          state: 'credential'
        }
      ];
    }

    function getActiveState(){
      return $stateProvider.activeState();
    }
  }

})();


