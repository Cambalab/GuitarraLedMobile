'use strict';

angular.module('GLedMovile.services')
.factory('BluetoothService', function(_, $q, $cordovaBluetoothSerial, $log, $rootScope, $ionicLoading) {

  var bluetoothDevices = [];
  var conectado = false;
  var ledArray = [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000];
  var intervalID;

  function reloadBTDevices() {
    bluetoothSerial.list(function(devices) {
      bluetoothDevices.length = 0;
      devices.forEach(function(dev) {
        bluetoothDevices.push(dev);
      });
      $rootScope.$apply();
    },function(a){$log.debug(a)});
  };

  if (ionic.Platform.isAndroid()) {
    setInterval(reloadBTDevices, 2000);
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
        //FIXME
        intervalID = repeat(100);
        $log.debug(intervalID);
      },

      function(err) {
        $log.debug('bluetooth connect error: ', err);
        dfd.reject({device:device, error:err});
      }
    );

    return dfd.promise;
  }


  var desconectarBluetooth = function() {
    conectado = false;

    $cordovaBluetoothSerial.disconnect().then(
      function(success) {
        $log.debug('Desconecto', success);
      } ,
      function(fail) {
        $log.debug('error', fail);
      }
    );
  };

    var toLedArray = function(position){
      ledArray = [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000];
      for (var i = 0; i < position.length ; i++) {
        ledArray[position[i].str-1] = Math.pow(2,parseInt(position[i].fret));
      }
      $log.debug(ledArray);
    }

    document.addEventListener('note', function (note) {
      toLedArray(note.detail.current.position);
      $log.debug(ledArray)
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

    var repeat = function(mills) {
      setInterval(function() {
        sendData(ledArray);
      }, mills);
    };

  return {
    devices: bluetoothDevices,
    conectar: conectarBluetooth,
    desconectar: desconectarBluetooth,
  }
  });
