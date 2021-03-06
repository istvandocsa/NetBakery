/**
 * Created by wermerbalazs on 20/12/15.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('allow', allow);

  allow.$inject = ['authenticator', '$log'];

  /* @ngInject */
  function allow(authenticator, $log) {
    var directive = {
      restrict: 'A',
      priority: 100000,
      scope: false,
      compile: function (element, attr, linker) {
        var accessDenied = true;
        var user = authenticator.currentUser();

        if (user == undefined) {
          user = {role: 'GUEST'};
        }

        var roles = attr.access.split(" ");
        angular.forEach(roles, function (role) {
          if (user.role === role) {
            accessDenied = false;
            return false;
          }
        });

        if (accessDenied) {
          angular.forEach(element.children(), function (elm) {
            try {
              elm.remove();
            } catch (error) {
              $log.error('Error happened during element removal.', error);
            }
          });
        }

      }
    };
    return directive;
  }
})();

