'use strict';

/**
* @ngdoc function
* @name todo.controller:BtCtrl
* @description
* # BtCtrl
* Controller of the BluetoothSerial
*/

angular.module('GLedMovile.controllers')
  .controller('BtCtrl', function($scope, $localStorage, $cordovaBluetoothSerial) {

    $scope.devices = '';
    var conectado = false;
    $scope.$storage = $localStorage.$default({
      connect : false,
      repeat: 200,
    });

    var ledArray = [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000];
    document.addEventListener('note', function (note) {
      $scope.toLedArray(note.detail.current.position);
      console.log(ledArray)
      }, false);
    $scope.toLedArray = function(position){
      ledArray = [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000];
      for (var i = 0; i < position.length ; i++) {
        ledArray[position[i].str-1] = parseInt(position[i].fret)
      }
    };
    $scope.connect = function() {

    $cordovaBluetoothSerial.connect('20:13:09:05:34:47').then(
      function(success) {
          console.log('Conecto', success);
          conectado = true;
        } ,
        function(fail) {
          console.log('error', fail);
          conectado = false;
        }
      );
    };

    $scope.disconnect = function() {
      $cordovaBluetoothSerial.disconnect().then(
        function(success) {
          console.log('Desconecto', success);
          conectado = false;
        } ,
        function(fail) {
          console.log('error', fail);
          conectado = false;
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

    $scope.sendData = function(stringsData) {
      if(conectado){
          $cordovaBluetoothSerial.write('N');
  		    for (var i = stringsData.length-1; i >= 0 ; i--) {
            $cordovaBluetoothSerial.write(String.fromCharCode((stringsData[i]>>16) & 0xff));
	          $cordovaBluetoothSerial.write(String.fromCharCode((stringsData[i]>>8) & 0xff));
			      $cordovaBluetoothSerial.write(String.fromCharCode(stringsData[i] & 0xff));
		      }
      }
    };

    $scope.repeat = function(mills) {
      setInterval(function() {
        $scope.sendData(ledArray);
      }, mills);
    };

  });
