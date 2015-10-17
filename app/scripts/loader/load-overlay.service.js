/**
 * Created by István on 10/15/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('loadOverlay', loadOverlay);

  loadOverlay.$inject = ['usSpinnerService'];

  /* @ngInject */
  function loadOverlay(usSpinnerService) {
    var service = {
      on: on,
      off: off
    };
    return service;

    ////////////////

    function on() {
      usSpinnerService.spin('body');
    }

    function off(){
      usSpinnerService.stop('body');
    }
  }

})();

