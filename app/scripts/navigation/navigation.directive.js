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
      templateUrl: 'scripts/navigation/navigation.directive.html',
      controller: 'NavigationController',
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {}
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();
