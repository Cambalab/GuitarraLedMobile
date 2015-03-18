'use strict';

/**
* @ngdoc function
* @name todo.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of the todo
*/

angular.module('GLedMobile.controllers')
  .controller('SongsCtrl',function($scope,FileService) {
    $scope.songs = FileService.listTablatures();
    if(!ionic.Platform.isAndroid()){
      $scope.songs=[];
      $scope.songs.push("prueba.gp5");
    }
});
