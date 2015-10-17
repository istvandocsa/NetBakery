/**
 * Created by István on 10/10/2015.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$log', 'firebaseService'];

  /* @ngInject */
  function HomeController($log, firebase) {
    var vm = this;
    vm.title = 'HomeController';
    vm.newThing;
    vm.awesomeThings;
    vm.addThing;

    activate();

    ////////////////

    function activate() {
      vm.awesomeThings = firebase.getArray('awesomeThings');
      vm.newThing = 'Kecske';
      vm.addThing = addThing;
    }

    function addThing(){
      vm.awesomeThings.$add({text: vm.newThing});
      vm.newThing = 'Kecske';
    }
  }

})();

