'use strict';

angular.module('GLedMovile.services')
.factory('BluetoothService', function(_, $q, $interval, $cordovaBluetoothSerial, $log, $rootScope, $ionicLoading) {

  var bluetoothDevices = [];
  var conectado = false;
  var enabled = false;
  var ledArray = [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000];
  var intervalID;

  function reloadBTDevices() {
    bluetoothSerial.list(function(devices) {
      bluetoothDevices.length = 0;
      devices.forEach(function(dev) {
        bluetoothDevices.push(dev);
      });
    },function(a){$log.debug(a)});
  };

  function checkBTEnabled() {
      bluetoothSerial.isEnabled(function() {
        if (!enabled) {
            enabled = true;
            $rootScope.$broadcast('Bluetooth.Enabled');
$log.debug('bt enabled');
        }
      }, function() {
        if (enabled) {
            enabled = false;
            $rootScope.$broadcast('Bluetooth.Disabled');
$log.debug('bt DISabled');
        }
      });
  };

  if (ionic.Platform.isAndroid()) {
    $interval(reloadBTDevices, 2000);
    $interval(checkBTEnabled, 2000);
  } else {
    bluetoothDevices.push({
      name: "dummy BT device",
      address: "20:14:04:09:17:25",
      id: "20:14:04:09:17:25",
      "class": 7936,
    });
    bluetoothDevices.push({
      name: "dummy BT device 2222",
      address: "20:14:04:09:17:33",
      id: "20:14:04:09:17:33",
      "class": 7936,
    });
  }

  var conectarBluetooth = function(options) {
    var dfd = $q.defer();

    if (!options.device) {
      dfd.reject({device:undefined, error:'no device'});
      return dfd.promise;
    }

    var device = options.device;

    conectado = false;
    bluetoothSerial.disconnect();

    bluetoothSerial.connect(device.address,
      function() {
        $log.debug('bluetooth connect OK   : ', device.name, ' ', arguments);
        conectado = true;
        $rootScope.$apply();
        dfd.resolve(device);
        $rootScope.$broadcast('Bluetooth.Connected', device);
      },

      function(err) {
        $log.debug('bluetooth connect error: ', err);
        conectado = false;
        $rootScope.$apply();
        dfd.reject({device:device, error:err});
        $rootScope.$broadcast('Bluetooth.ConnectError', device, err);
      }
    );

    return dfd.promise;
  }


  var desconectarBluetooth = function() {
    conectado = false;
    var dfd = $q.defer();

    $cordovaBluetoothSerial.disconnect().then(
      function(success) {
        $log.debug('Desconecto', success);
        $rootScope.$broadcast('Bluetooth.Disconnected');
        dfd.resolve();
      } ,
      function(fail) {
        $log.debug('error', fail);
        $rootScope.$broadcast('Bluetooth.Disconnected', fail);
        dfd.resolve();
      }
    );

    return dfd.promise;
  };

    var toLedArray = function(position){
      ledArray = [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000];
      for (var i = 0; i < position.length ; i++) {
        ledArray[position[i].str-1] = Math.pow(2,parseInt(position[i].fret));
      }
    }

    document.addEventListener('note', function (note) {
      toLedArray(note.detail.current.position);
      sendData(ledArray);
      }, false);

    var sendData = function(stringsData) {
      if(conectado){
          bluetoothSerial.write('N');
          for (var i = stringsData.length-1; i >= 0 ; i--) {
            bluetoothSerial.write(String.fromCharCode((stringsData[i]>>16) & 0xff));
            bluetoothSerial.write(String.fromCharCode((stringsData[i]>>8) & 0xff));
            bluetoothSerial.write(String.fromCharCode(stringsData[i] & 0xff));
          }
      }
    };

  return {
    devices: bluetoothDevices,
    conectar: conectarBluetooth,
    desconectar: desconectarBluetooth,
    conectado: conectado,
    enabled: enabled,
  }
  });
