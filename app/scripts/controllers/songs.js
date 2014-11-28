'use strict';

/**
* @ngdoc function
* @name todo.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of the todo
*/

angular.module('GLedMovile.controllers')
  .controller('SongsCtrl',function($scope) {
	  $scope.songs = [
                { name: "Green River", author: "Creedence" },
                { name: "Mi Vieja", author: "Pappo" },
                { name: "Asesíname", author: "Charly Garcia" },
                { name: "Juntos a la Par", author: "Pappo" },
                { name: "Snow", author: "Red Hot Chili Peppers" },
                { name: "Smoke on the Water", author: "Deep Purple" }
            ];
	  });
