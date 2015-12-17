/**
 * Created by NetHunter on 2015. 12. 17..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('modalService', modalService);

  modalService.$inject = ['$log', '$uibModal'];

  /* @ngInject */
  function modalService($log, $uibModal) {
    var activeModal;

    var service = {
      show: show
    };
    return service;

    ////////////////

    function show(templateUrl, controller) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
      });
    }
  }

})();
