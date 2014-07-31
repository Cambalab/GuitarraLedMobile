'use strict';

/**
* @ngdoc function
* @name todo.controller:BtCtrl
* @description
* # BtCtrl
* Controller of the BluetoothSerial
*/

angular.module('<%= appName %>.controllers')
  .controller('BtCtrl', function($scope, $localStorage, $cordovaBluetoothSerial) {

    $scope.devices = '';

    $scope.$storage = $localStorage.$default({
      connect : false,
      repeat: 200,
    });

    var ledArray = [0x0000, 0x0001, 0x0002, 0x0004, 0x0008, 0x0010];
/*
    $scope.$watch('$storage.connect', function(newVal, oldVal) {
      if(newVal === true) {
        $scope.repeat($scope.$storage.repeat);
      } else {
        $scope.disconnect();
      }
    }, true);
*/
    $scope.connect = function() {

    $cordovaBluetoothSerial.connect('20:13:09:05:34:47').then(
      function(success) {
          console.log('Conecto', success);
        } ,
        function(fail) {
          console.log('error', fail);
        }
      );
    };

    $scope.disconnect = function() {
      $cordovaBluetoothSerial.disconnect().then(
        function(success) {
          console.log('Desconecto', success);
        } ,
        function(fail) {
          console.log('error', fail);
        }
      );
    };


    $scope.isConnected = function() {
       $cordovaBluetoothSerial.isConnected().then(
        function(success) {
          console.log('Esta: ', success);
        } ,
        function(fail) {
          console.log('Esta desconectado', fail);
        }
      );
    };

    $scope.listDevices = function() {
      $cordovaBluetoothSerial.list().then(
        function(list) {
          $scope.devices = list;
        },
        function(err) {
          console.log('Error ',err)
        }
      );
    };

    $scope.sendData = function(ledArray) {
      $cordovaBluetoothSerial.isConnected().then(
        function(success) {
          $cordovaBluetoothSerial.write('N');
  		    for (var i = ledArray.length-1; i >= 0 ; i--) {
            $cordovaBluetoothSerial.write(String.fromCharCode((ledArray[i]>>16) & 0xff));
	          $cordovaBluetoothSerial.write(String.fromCharCode((ledArray[i]>>8) & 0xff));
			      $cordovaBluetoothSerial.write(String.fromCharCode(ledArray[i] & 0xff));
		      }
        },
        function (err) {
          $scope.connect();
        }
      );
    };

    $scope.repeat = function(mills) {
      setInterval(function() {
        $scope.sendData(ledArray);
      }, mills);
    };

    $scope.listDevices();
  });
