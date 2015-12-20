/**
 * Created by István on 10/10/2015.
 */
'use strict';
angular
  .module('app')
  .config(function (stateHelperProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('/credential', '/credential/login')
      .when('/stockManager', '/stockManager/stock')
      .otherwise('/');

    stateHelperProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'scripts/home/home.template.html'
      })
      .state({
        name: 'stock',
        url: '/stockManager/stock',
        templateUrl: 'scripts/ingredient/stock/stock-view.template.html',
        controller: 'StockController',
        controllerAs: 'vm'
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
      })
      .state({
        name: 'report',
        url: '/report',
        templateUrl: 'scripts/report/report.template.html',
        children: [
          {
            name: 'popularIngredients',
            url: '/popularIngredients',
            templateUrl: 'scripts/report/ingredients/popular-ingredients-template.html',
            controller: 'PopularIngredientsController',
            controllerAs: 'vm'
          },
          {
            name: 'popularItems',
            url: '/popularItems',
            templateUrl: 'scripts/report/popular/popular-item-template.html',
            controller: 'PopularItemsController',
            controllerAs: 'vm'
          }
        ]
      })
      .state({
        name: 'price-list',
        url: '/admin/price-list',
        templateUrl: 'scripts/product/price/price-list.template.html',
        controller: 'PriceListController',
        controllerAs: 'vm'
      });

  });
