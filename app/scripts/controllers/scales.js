'use strict';

/**
* @ngdoc function
* @name gledmobile.controllers:ScalesCtrl
* @description
* # ScalesCtrl
* Controller of the gledmobile
*/

angular.module('gledmobile.controllers')
  .controller('ScalesCtrl',function($scope) {
	  $scope.scales = [
                { name: "C", abc: "|CEGc|", hex:"" }
            ];
	  });
