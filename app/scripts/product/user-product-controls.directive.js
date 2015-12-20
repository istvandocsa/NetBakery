/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('userProductControls', userProductControls);

  userProductControls.$inject = [];

  /* @ngInject */
  function userProductControls() {
    var directive = {
      bindToController: true,
      controller: 'ProductController',
      templateUrl: 'scripts/product/user-product-controls.template.html',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;
  }

})();

