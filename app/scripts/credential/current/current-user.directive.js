(function () {
  'use strict';

  angular
    .module('app')
    .directive('currentUser', currentUser);

  currentUser.$inject = [];

  /* @ngInject */
  function currentUser() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/credential/current/current-user.template.html',
      controller: "CurrentUserController",
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;
  }
})();



