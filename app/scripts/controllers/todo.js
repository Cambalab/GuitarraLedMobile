'use strict';

/**
* @ngdoc function
* @name todo.controller:TodoCtrl
* @description
* # TodoCtrl
* Controller of the todo
*/

angular.module('todo.controllers', [])
  .controller('TodoCtrl', function($scope, $ionicModal) {
    $scope.tasks = [];
    $scope.task = { item: '' };

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('views/new-task.html', function(modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createTask = function() {
      var item = this.task.title;
      if(!item) { return; }

      $scope.tasks.push({
        title: item
      });
      $scope.taskModal.hide();
      this.task.title = '';
    };

    // Open our new task modal
    $scope.newTask = function() {
      $scope.taskModal.show();
    };

    // Close the new task modal
    $scope.closeNewTask = function() {
      $scope.taskModal.hide();
    };

    $scope.removeTask = function (index) {
      $scope.tasks.splice(index, 1);
    };

  });
