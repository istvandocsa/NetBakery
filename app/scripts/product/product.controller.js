/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductController', ProductController);

  ProductController.$inject = [];

  /* @ngInject */
  function ProductController() {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      console.log(vm.object);
    }
  }

})();

