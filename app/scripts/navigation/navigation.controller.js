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
  NavigationController.$inject = ['$location', '$log', '$http', '$filter', '$rootScope', 'authorizer'];

  /* @ngInject */
  function NavigationController($stateProvider, $log, $http, $filter, $rootScope, authorizer) {
    var vm = this;
    var menuItems = [];

    activate();

    ////////////////

    function activate() {
      vm.brand = 'NetBakery';
      vm.activeState = getActiveState;

      $http({
        method: 'GET',
        url: '/scripts/navigation/navigation.json'
      }).then(function success(response){
        menuItems = response.data;
        $log.info("Got menu items ", menuItems);
        updateMenuItems();
      });

      $rootScope.$on("credential.login.success", updateMenuItems);
      $rootScope.$on("credential.logout", updateMenuItems);
    }

    function updateMenuItems(){
      vm.menuItems = $filter('filter')(menuItems, function(menuItem){
        return authorizer.isAuthorized(menuItem.state);
      });
    }

    function getActiveState(){
      return $stateProvider.activeState();
    }
  }

})();


