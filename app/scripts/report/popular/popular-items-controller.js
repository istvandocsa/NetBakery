(function () {
  'use strict';

  angular
    .module('app')
    .controller('PopularItemsController', PopularItemsController);

  /* @ngInject */
  function PopularItemsController($scope) {
    var vm = this;

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];

    activate();

    ////////////////

    function activate() {
    }

  }

})();
