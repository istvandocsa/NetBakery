/**
 * Created by wermerbalazs on 06/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('modalService', modalService);

  modalService.$inject = ['$modal'];

  /* @ngInject */
  function modalService($modal) {
    var service = {
      showModal: showModal
    };
    return service;

    ////////////////

    function showModal(scope) {
      var modal = $modal({scope: scope, templateUrl: 'scripts/product/cart/cart.template.html', show: false});
      modal.$promise.then(modal.show);
    };
    /*$scope.hideModal = function() {
     myModal.$promise.then(myModal.hide);
     };*/
  }

})();

