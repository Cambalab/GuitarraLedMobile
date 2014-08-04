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
      .determinePreferredLanguage(function() {
        var preferredlangKey = 'es';
        return preferredlangKey;
      });
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('gledmobile', {
        url: '/gledmobile',
        abstract: true,
        templateUrl: 'views/gledmobile.html',
        controller: 'GLedCtrl'
      })
      .state('gledmobile.list', {
        url: '/guitarlist',
        views: {
          'gledmobile-guitarlist': {
            templateUrl: 'views/gledmobile-guitarlist.html'
          }
        }
      })
      .state('gledmobile.modes', {
        url: '/modes',
        views: {
          'gledmobile-guitarlist': {
            templateUrl: 'views/gledmobile-modes.html'
          }
        }
      })
      .state('gledmobile.songlist', {
        url: '/songlist',
        views: {
          'gledmobile-guitarlist': {
            templateUrl: 'views/gledmobile-songlist.html',
            controller: 'SongsCtrl'
          }
        }
      })
      .state('gledmobile.chords', {
        url: '/chords',
        views: {
          'gledmobile-guitarlist': {
            templateUrl: 'views/gledmobile-chords.html',
            controller: 'ChordsCtrl'
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
