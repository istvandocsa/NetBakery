/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductAdminController', ProductAdminController);

  ProductAdminController.$inject = ['modalService', 'productService'];

  /* @ngInject */
  function ProductAdminController(modalService, productService) {
    var vm = this;
    var product;
    activate();

    ////////////////

    function activate() {
      vm.delete = deleteOnClick;
      vm.edit = editOnClick;
      product = productService.getProductById(vm.product.$id);
    }

    function deleteOnClick() {
      modalService.show("scripts/product/admin/modal/popup.template.html", "PopupController", "sm", {product: product});
    }

    function editOnClick() {
      modalService.show("scripts/product/admin/modal/product-editor.template.html", "ProductEditorController", "md", {product: product});
    }

  }

})();

