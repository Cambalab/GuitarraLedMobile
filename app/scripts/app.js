'use strict';

/**
 * @ngdoc overview
 * @name gledmobile
 * @description
 * # Guitarra Led Mobile
 *
 * Main module of the application.
 */

angular
  .module('gledmobile', [
    'ionic',
    'gledmobile.controllers',
    'pascalprecht.translate'
  ])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    });
  })
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider
      .translations('en', translationsEN)
      .translations('es', translationsES)
      .preferredLanguage('es');
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('gledmobile', {
        url: '/gledmobile',
        abstract: true,
        templateUrl: 'views/gledmobile.html'
      })
      .state('gledmobile.list', {
        url: '/guitarlist',
        views: {
          'gledmobile-guitarlist': {
            templateUrl: 'views/gledmobile-guitarlist.html',
            controller: 'GLedCtrl'
          }
        }
      })
      .state('gledmobile.about', {
        url: '/about',
        views: {
          'gledmobile-about': {
            templateUrl: 'views/gledmobile-about.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/gledmobile/guitarlist');
  });
