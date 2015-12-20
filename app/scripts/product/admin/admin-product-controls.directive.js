/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('adminProductControls', adminProductControls);

  adminProductControls.$inject = [];

  /* @ngInject */
  function adminProductControls() {
    var directive = {
      bindToController: true,
      controller: 'ProductAdminController',
      templateUrl: 'scripts/product/admin/admin-product-controls.template.html',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        product: '='
      }
    };
    return directive;
  }


})();

