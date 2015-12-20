/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['productService', 'modalService'];

  /* @ngInject */
  function ProductsController(productService, modalService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = productService.getProducts();
      vm.addNew = addNew;
    }

    function addNew(){
      modalService.show("scripts/product/admin/modal/product-editor.template.html", "ProductEditorController", "md", {product: {}, isNew: true});
    }
  }

})();

