'use strict';

/**
* @ngdoc function
* @name gledmobile.controllers:ChordsCtrl
* @description
* # ChordsCtrl
* Controller of the gledmobile
*/

angular.module('<%= appName %>.controllers')
  .controller('ChordsCtrl',function($scope, ChordService) {
	  $scope.chords = ChordService.all();
	  });
