'use strict';
angular.module('GLedMovile.controllers')
  .controller('ScalesCtrl',function($scope, ScaleService,$interval) {
    $scope.scales = ScaleService.groupedScales;
    $scope.tonics = Object.keys($scope.scales);
    var withTonics = false;
    var model = {
      selectedTonic: $scope.tonics[0],
      selectedScale: $scope.scales[$scope.tonics[0]][0]
    }
    
    $scope.model = model;
    
    $scope.onTonicChange = function(tonic) {
      model.selectedScale = $scope.scales[tonic][0];
    }
    
    function __sendScaleToGuitar(scale) {
      var ev = new CustomEvent('scale', scale);

      document.dispatchEvent(ev);
    }
    
    function toggleTonics(){
      if (withTonics){
        __sendScaleToGuitar(model.selectedScale.withtonic);
      }
      else{
        __sendScaleToGuitar(model.selectedScale.withouttonic);
      }
      withTonics = !withTonics;
    }
    $interval(toggleTonics, 1000);
});
