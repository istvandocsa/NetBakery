/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['dependency'];

  /* @ngInject */
  function ProductController(dependency) {
    var vm = this;

    activate();

    ////////////////

    function activate() {

    }
  }

})();

