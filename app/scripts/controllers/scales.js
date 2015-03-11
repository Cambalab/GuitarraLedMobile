'use strict';

/**
* @ngdoc function
* @name gledmobile.controllers:ScalesCtrl
* @description
* # ScalesCtrl
* Controller of the gledmobile
*/

angular.module('GLedMovile.controllers')
  .controller('ScalesCtrl',function($scope, $interval, timeout) {
      timeout.intervalo = $interval( function() { console.log('aaaa')}, 1000);
	  $scope.scales = [
                { name: "C", abc: "|CEGc|", hex:"" }
            ];
	  });
