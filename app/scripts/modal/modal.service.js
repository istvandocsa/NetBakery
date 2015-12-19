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

    function show(templateUrl, controller, size, items) {
      return $uibModal.open({
        animation: true,
        size: size,
        templateUrl: templateUrl,
        controller: controller,
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          items: function () {
            return items;
          }
        }
      });
    }
  }

})();
