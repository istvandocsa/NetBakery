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

    var currentUser;
    var loadingUser = false;

    var service = {
      authenticate: authenticate,
      createUser: createUser,
      currentUser: getCurrentUser,
      logout: logout
    };
    return service;

    ////////////////

    function logout(){
      firebaseAuth.$unauth();
      currentUser = undefined;
      $rootScope.$emit("credential.logout");
    }

    function authenticate(credential){
      return firebaseAuth.$authWithPassword({
        email: credential.email,
        password: credential.password
      }).then(function(authData){
        $log.info("Successfully logged in as " + authData.uid);
        firebaseService.getObject("/users/" + authData.uid + "/role").$loaded().then(function(role){
          currentUser = {uid: authData.uid, email: credential.email, role: role.$value};
          $log.info("Setting currently logged in used ", currentUser);
          $rootScope.$emit('credential.login.success', currentUser);
        });
      }).catch(function(error){
        $log.info("Failed to log in!");
        $rootScope.$emit('credential.login.error', error);
      });
    }

    function getCurrentUser(){
      if(angular.isUndefined(currentUser)){
        $log.info("currentUser is undefined.");
        var auth = firebaseAuth.$getAuth();
        if(!loadingUser && auth){
          loadingUser = true;
          $log.info("Authentication exitst ", auth);
          firebaseService.getObject("/users/" + auth.uid).$loaded().then(function(user){
            currentUser = {uid: auth.uid, email: user.email, role: user.role};
            $rootScope.$emit('credential.login.success', currentUser);
          });
        }
      }
      return currentUser;
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



