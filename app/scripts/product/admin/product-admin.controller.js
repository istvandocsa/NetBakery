/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductAdminController', ProductAdminController);

  ProductAdminController.$inject = ['productService'];

  /* @ngInject */
  function ProductAdminController(productService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.delete = deleteOnClick;
      vm.edit = editOnClick;
    }

    function deleteOnClick(){
      var product = productService.getProductById(vm.product.$id);
      product.$remove();
    }

    function editOnClick(){
      console.log('edit')
    }

  }

})();

