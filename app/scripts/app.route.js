/**
 * Created by István on 10/10/2015.
 */
'use strict';
angular
  .module('app')
  .config(function (stateHelperProvider, $urlRouterProvider) {

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
        name: 'stockManager',
        url: '/stockManager',
        template: '<ui-view></ui-view>',
        children: [
          {
            name: 'stock',
            url: '/stock',
            templateUrl: 'scripts/ingredient/stock/stock-view.template.html',
            controller: 'StockController',
            controllerAs: 'vm'
          }
        ],
        data: {
          requiredRole: 'STOCK'
        }
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
        ],
        data: {
          requiredRole: 'GUEST'
        }
      })
      .state({
        name: 'admin',
        url: '/admin',
        templateUrl: 'scripts/report/report.template.html',
        children: [{
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
            },
            {
              name: 'neverUsedIngredients',
              url: '/neverUsedIngredients',
              templateUrl: 'scripts/report/never-used/never-used-ingredients-template.html',
              controller: 'NeverUsedIngredientsController',
              controllerAs: 'vm'
            }
          ]
        }],
        data: {
          requiredRole: 'ADMIN'
        }
      })
      .state({
        name: 'price-list',
        url: '/admin/price-list',
        templateUrl: 'scripts/product/price/price-list.template.html',
        controller: 'PriceListController',
        controllerAs: 'vm'
      });

  }).run(function ($rootScope, $log, $state, authorizer) {
  $rootScope.$on("$stateChangeStart", handleSecurityCheck);

  function handleSecurityCheck(event, state) {
    if(!authorizer.isAuthorized(state)){
      event.preventDefault();
      $state.go("home");
    }

  }
});
