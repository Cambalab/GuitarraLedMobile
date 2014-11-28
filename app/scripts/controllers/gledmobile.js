'use strict';

/**
* @ngdoc function
* @name gledmobile.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of gledmobile
*/

angular.module('GLedMovile.controllers',[]);

angular.module('GLedMovile.controllers')
  .controller('GLedCtrl',function($scope, $ionicModal, $ionicLoading, $log, $cordovaBluetoothSerial, BluetoothService) {

  $scope.bluetoothDevices = BluetoothService.devices
  $scope.conectarBluetooth = function(options) {
    var device = options.device;

    $ionicLoading.show({
      template: 'Conectando a ' + device.name + ' ...',
    });


    BluetoothService.conectar(options)
    .then( function(device) {
      $ionicLoading.hide();
    })
    .catch( function(device) {
      $ionicLoading.show({
        template: 'Bluetooth error: ' + err,
        duration: 1500,
      });
    });

  }

  $log.debug($cordovaBluetoothSerial);

  $scope.addGuitar = function() {

  }

  });
