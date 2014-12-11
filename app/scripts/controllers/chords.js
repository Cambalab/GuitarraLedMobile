'use strict';

/**
* @ngdoc function
* @name gledmobile.controllers:ChordsCtrl
* @description
* # ChordsCtrl
* Controller of the gledmobile
*/

angular.module('GLedMovile.controllers')
  .controller('ChordsCtrl',function($scope, ChordService) {
    $scope.chords = ChordService.all;
    $scope.roots  = ChordService.roots;

    $scope.selectedRoot = $scope.roots[0];
    $scope.selectedChord = $scope.chords[$scope.selectedRoot][0];

    $scope.onRootChange = function(root) {
      $scope.selectedChord = $scope.chords[root][0];
    }
  })
  .controller('ChordDisplayCtrl', function($scope, $stateParams, ChordService) {
    $scope.chord = ChordService.get($stateParams.chordName);
  });
