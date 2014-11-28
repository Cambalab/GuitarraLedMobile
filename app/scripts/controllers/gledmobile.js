'use strict';

/**
* @ngdoc function
* @name gledmobile.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of gledmobile
*/

angular.module('<%= appName %>.controllers',[]);

angular.module('<%= appName %>.controllers')
  .controller('GLedCtrl',function($scope, $ionicModal, $ionicLoading, $log, $cordovaBluetoothSerial) {
  $scope.bluetoothDevices = [];
  $log.debug($cordovaBluetoothSerial);
  function reloadBTDevices() {
    $cordovaBluetoothSerial.list(function(devices) {
      $scope.bluetoothDevices = devices;
      $scope.$apply();
      $log.debug("hola");
    },function(a){$log.debug(a)});
  };

  if (ionic.Platform.isAndroid()) {
    setInterval(reloadBTDevices, 2000);
  } else {
    $scope.bluetoothDevices.push({
      name: "dummy BT device",
      address: "20:14:04:09:17:25",
      id: "20:14:04:09:17:25",
      "class": 7936,
    });
  }

  $scope.conectarBluetooth = function(options) {
    var options = options || {debug: true};

    if (!options.device) {
      return;
    }

    var device = options.device;

    $cordovaBluetoothSerial.disconnect();
    $ionicLoading.show({
      template: 'Conectando a ' + device.name + ' ...',
    });

    $cordovaBluetoothSerial.connect(device.address,
      function() {
        $log.debug('bluetooth connect OK   : ', device.name, ' ', arguments);
        $ionicLoading.hide();
      },

      function(err) {
        $log.debug('bluetooth connect error: ', err);
        $ionicLoading.show({
          template: 'Bluetooth error: ' + err,
          duration: 1500,
        });
      }
    );
  }
  });
