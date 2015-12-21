/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['productService', 'modalService', 'authenticator', '$rootScope'];

  /* @ngInject */
  function ProductsController(productService, modalService, authenticator, $rootScope) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      vm.products = productService.getProducts();
      vm.addNew = addNew;

      $rootScope.$on("credential.login.success", function(event, user){
        vm.role = user.role;
      });
    }

    function addNew(){
      modalService.show("scripts/product/admin/modal/product-editor.template.html", "ProductEditorController", "md", {product: {}, isNew: true});
    }
  }

})();

