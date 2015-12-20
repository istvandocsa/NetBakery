/**
 * Created by NetHunter on 2015. 12. 20..
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('authorizer', authorizer);

  authorizer.$inject = ['authenticator', '$state', '$log'];

  /* @ngInject */
  function authorizer(authenticator, $state, $log) {
    var service = {
      isAuthorized: isAuthorized,
      is: is
    };
    return service;

    ////////////////

    function is(role){
      var userRole = "GUEST";
      var currentUser = authenticator.currentUser();
      if(currentUser){
        userRole = currentUser.role;
      }

      return role === userRole;
    }

    function isAuthorized(stateOrName){
      $log.info("Checking authorization for given state. ", stateOrName);
      var state;
      if(angular.isObject(stateOrName)){
        $log.debug("State was given by Object.");
        state = stateOrName;
      }else {
        $log.debug("State was given by name.");
        state = $state.get(stateOrName);
        $log.debug("Fetched state by name. ", state);
      }
      var requiredRole = getRequiredRole();
      var loggedInUser = authenticator.currentUser();

      if(requiredRole === "GUEST" && angular.isUndefined(loggedInUser)){
        return true;
      }

      if(requiredRole && !(loggedInUser && loggedInUser.role === requiredRole)){
        $log.debug("State will be not authorized.");
        return false;
      }
      $log.info("State is authorized.");
      return true;

      function getRequiredRole() {
        if (state.data) {
          return state.data.requiredRole;
        } else {
          return undefined;
        }
      }
    }


  }

})();

