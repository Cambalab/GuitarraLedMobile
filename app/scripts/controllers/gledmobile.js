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
  .controller('GLedCtrl',function($scope, $ionicModal, $ionicLoading, $log, $q, $cordovaBluetoothSerial, BluetoothService) {

  $scope.bluetoothDevices = BluetoothService.devices
  $scope.conectarBluetooth = function(options) {
    var device = options.device;
    var dfd = $q.defer()

    $ionicLoading.show({
      template: 'Conectando a ' + device.name + ' ...',
    });


    BluetoothService.conectar(options)
    .then( function(device) {
      $ionicLoading.hide();
      dfd.resolve(device);
    })
    .catch( function(device, err) {
      $ionicLoading.show({
        template: 'Bluetooth error: ' + err,
        duration: 1500,
      });
      dfd.reject(device, err);
    });

    return dfd.promise;
  }

  $log.debug($cordovaBluetoothSerial);

  $scope.addGuitar = function() {

  }

  });
