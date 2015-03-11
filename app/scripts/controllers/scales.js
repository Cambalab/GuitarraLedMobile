'use strict';

/**
* @ngdoc function
* @name gledmobile.controllers:ScalesCtrl
* @description
* # ScalesCtrl
* Controller of the gledmobile
*/

angular.module('GLedMovile.controllers')
  .controller('ScalesCtrl',function($scope, timeout) {
      timeout.id = 1337;
	  $scope.scales = [
                { name: "C", abc: "|CEGc|", hex:"" }
            ];
	  });
