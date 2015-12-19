/**
 * Created by István on 10/10/2015.
 */
'use strict';
angular
  .module('app')
  .config(function(stateHelperProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('/credential', '/credential/login')
      .otherwise('/');

    stateHelperProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'scripts/home/home.template.html'
      })
      .state({
        name: 'credential',
        url: '/credential',
        templateUrl: 'scripts/credential/credential.template.html',
        children: [
          {
            name: 'register',
            url: '/register',
            templateUrl: 'scripts/credential/register/credential.register.template.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          },
          {
            name: 'login',
            url: '/login',
            templateUrl: 'scripts/credential/login/credential.login.template.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        ]
      });

  });
