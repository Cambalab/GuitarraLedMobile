'use strict';

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */

angular
  .module('todo', [
    'ionic',
    'todo.controllers',
  ])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '/todo',
        abstract: true,
        templateUrl: 'views/todo.html'
      })
      .state('todo.list', {
        url: '/list',
        views: {
          'todo-list': {
            templateUrl: 'views/todo-list.html',
            controller: 'TodoCtrl'
          }
        }
      })
      .state('todo.about', {
        url: '/about',
        views: {
          'todo-about': {
            templateUrl: 'views/todo-about.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/todo/list');
  });
