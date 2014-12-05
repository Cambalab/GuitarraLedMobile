'use strict';

/**
* @ngdoc function
* @name gledmobile.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of gledmobile
*/

angular.module('GLedMovile.controllers',['ngStorage']);

angular.module('GLedMovile.controllers')
  .controller('GLedCtrl',function($scope, $state, $ionicModal, $ionicLoading, $log, $q, $localStorage, $sessionStorage, $cordovaBluetoothSerial, BluetoothService) {

  $scope.bluetoothDevices = BluetoothService.devices
  $scope.conectarBluetooth = function(options) {
    var device = options.device;
    var dfd = $q.defer()

    $ionicLoading.show({
      template: 'Conectando a ' + device.name + ' ...',
    });

    function __err_handler(err) {
      $ionicLoading.show({
        template: 'Bluetooth error: ' + err,
        duration: 1500,
      });
      dfd.reject(device, err);
    }

    try {
        BluetoothService.conectar(options)
        .then( function(device) {
          $ionicLoading.hide();
          dfd.resolve(device);
        })
        .catch( function(args) {
            __err_handler(args.error);
        });
    } catch (err) {
        __err_handler(err);
    }

    return dfd.promise;
  }

  $localStorage.$default({
    guitars: {}
  });

  $scope.guitars = $localStorage.guitars;

  $ionicModal.fromTemplateUrl('views/add-guitar.html', {scope: $scope}).then(function(modal) { $scope.addModal = modal});

  $scope.noGuitars = function() {
    return _.isEmpty($scope.guitars);
  }

  $scope.addGuitar = function(device) {
    console.log('addGuitar() device: ', device, ' storage[id]: ', $scope.guitars[device.address]);
    if ($scope.guitars[device.id] == undefined) {
        $scope.conectarBluetooth({device: device}).then(function() {
            device.alias = device.name;
            $scope.guitars[device.address] = device;
            $scope.closeAddGuitarModal();
            $state.go('gledmobile.modes');
        });
    } else {
        $scope.closeAddGuitarModal();
    }
  }

  $scope.isNewGuitar = function(device) {
    return ($scope.guitars[device.address] == undefined);
  }

  $scope.removeGuitar = function(device) {
    delete $scope.guitars[device.address];
  }

  $scope.showAddGuitarModal = function() {
    $scope.addModal.show();
  }

  $scope.closeAddGuitarModal = function() {
    $scope.addModal.hide();
  }

  $scope.connectToGuitar = function(guitar) {
    $scope.conectarBluetooth({device: guitar}).then(function() {
        $state.go('gledmobile.modes');
    });
  }

  });
