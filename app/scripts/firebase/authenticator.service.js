/**
 * Created by István on 10/9/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('authenticator', authenticator);

  authenticator.$inject = ['$rootScope', '$firebaseAuth', 'firebaseService', '$log'];

  /* @ngInject */
  function authenticator($rootScope, $firebaseAuth, firebaseService, $log) {
    var firebaseAuth = $firebaseAuth(firebaseService.getReference());

    var service = {
      authenticate: authenticate,
      createUser: createUser
    };
    return service;

    ////////////////

    function authenticate(credential){
      return firebaseAuth.$authWithPassword({
        email: credential.email,
        password: credential.password
      }).then(function(authData){
        $log.info("Successfully logged in as " + authData.uid);
        $rootScope.$emit('credential.login.success', authData);
      }).catch(function(error){
        $log.info("Failed to log in!");
        $rootScope.$emit('credential.login.error', error);
      });
    }

    function createUser(credentials){
      firebaseService.getReference().createUser({
        email: credentials.email,
        password: credentials.password
      }, function(error, userData){
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              $log.error("The new user account cannot be created because the email is already in use! [email = " + credentials.email + "]");
              break;
            case "INVALID_EMAIL":
              $log.error("The specified email is not a valid email! [email = " + credentials.email +"]");
              break;
            default:
              $log.error("Error creating user! [error = " + error + "]");
          }
          $rootScope.$emit('credentials.register.error', error);
        } else {
          registerDomainUser({
            uid: userData.uid,
            email: credentials.email,
            type: credentials.type
          });
        }
      });
    }

    function registerDomainUser(credentials) {
      var newUser = firebaseService.getObject('users/' + credentials.uid);
      newUser.email = credentials.email;
      newUser.type = credentials.type;
      newUser.role = "USER";
      newUser.$save().then(function(){
        $log.info("Successfully created user account! [uid = " + credentials.uid + ", email = " + credentials.email + "]");
        $rootScope.$emit('credentials.register.success', credentials);
      }).catch(function(error){
        $rootScope.$emit('credentials.register.error', error);
      });
    }
  }

})();



