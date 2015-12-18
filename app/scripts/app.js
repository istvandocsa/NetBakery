'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # Dedicated module for NetBakery
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ui.router.stateHelper',
    'ngSanitize',
    'ngTouch',
    'angularSpinner',
    'firebase',
    'ui.bootstrap',
    'angular-spinkit'
  ]);
