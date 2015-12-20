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
      saveObject: saveObject,
      getReference: getReference,
      updateObject: updateObject,
      updateArray: updateArray
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
      var currentReference = firebaseReference.child(url);
      $log.info('Getting object for path: ' + currentReference.toString());
      return $firebaseObject(currentReference);
    }

    function updateObject(url, obj){
      var currentReference = firebaseReference.child(url);
      $log.info('Updating object for path: ' + currentReference.toString());
      currentReference.update(obj);
    }

    function updateArray(url, array){
      var currentReference = firebaseReference.child(url);
      $log.info('Updating object for path: ' + currentReference.toString());
      currentReference.set(array);
    }

    function saveObject(url, obj){
      var currentReference = firebaseReference.child(url);
      $log.info('Saving object for path: ' + currentReference.toString());
      currentReference.push(obj);
    }

  }

})();


