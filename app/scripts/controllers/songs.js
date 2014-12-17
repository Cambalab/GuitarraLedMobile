'use strict';

/**
* @ngdoc function
* @name todo.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of the todo
*/

angular.module('GLedMovile.controllers')
  .controller('SongsCtrl',function($scope, FileService) {
	  $scope.songs = FileService.listTablatures();
});
