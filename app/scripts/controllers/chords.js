'use strict';

/**
* @ngdoc function
* @name gledmobile.controllers:ChordsCtrl
* @description
* # ChordsCtrl
* Controller of the gledmobile
*/

angular.module('gledmobile.controllers')
  .controller('ChordsCtrl',function($scope) {
	  $scope.chords = [
                { name: "C", abc: "|CEGc|", hex:"" }
            ];
	  });
