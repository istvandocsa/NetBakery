/**
 * Created by István on 10/10/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('navigation', navigation);

  navigation.$inject = [];

  /* @ngInject */
  function navigation() {
    var directive = {
      bindToController: true,
      templateUrl: 'scripts/navigation/navigation.template.html',
      controller: 'NavigationController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;
  }
})();

