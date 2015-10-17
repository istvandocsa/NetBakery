/**
 * Created by István on 10/8/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('firebaseService', firebaseService);

  firebaseService.$inject = ['$log', '$firebaseArray', '$firebaseObject'];

  /* @ngInject */
  function firebaseService($log, $firebaseArray, $firebaseObject) {
    var baseURL = "https://netbakery.firebaseio.com";
    var firebaseReference = new Firebase(baseURL);

    var service = {
      getArray: getArray,
      getObject: getObject,
      getReference: getReference
    };
    return service;

    ////////////////

    function getReference(){
      return firebaseReference;
    }

    function getArray(url){
      var currentReference = firebaseReference.child(url);
      $log.info('Getting array for path: ' + currentReference.toString());
      return $firebaseArray(currentReference);
    }

    function getObject(url){
      return $firebaseObject(firebaseReference.child(url));
    }
  }

})();


