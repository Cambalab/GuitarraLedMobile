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

    var model = {
      selectedRoot: $scope.roots[0],
      selectedChord: $scope.chords[$scope.roots[0]][0],
      variation: 1,
    }
    $scope.model = model;

    function __sendNotesToGuitar(positions) {
      var payload = { 'detail': { 'current': { 'position': positions }}};
      var ev = new CustomEvent('note', payload);

      document.dispatchEvent(ev);
    }

    $scope.onRootChange = function(root) {
      model.variation = 1;
      model.selectedChord = $scope.chords[root][0];
    }

    $scope.onChordChange = function(root) {
      model.variation = 1;
    }

    $scope.$watch(function() {
        return model.selectedChord + ':' + model.variation;
    }, function(newValue, oldValue) {
        var positions = ChordService.chordNameToPositions(newValue);
        __sendNotesToGuitar(positions);
    });

  })
  .controller('ChordDisplayCtrl', function($scope, $stateParams, ChordService) {
    $scope.chord = ChordService.get($stateParams.chordName);
  });
