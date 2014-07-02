
$('#connect').click(function(){
bluetoothSerial.connect('20:13:09:05:34:47')
connecting();

})

function connecting(){
bluetoothSerial.isConnected(
  function() { 
    $('#connect').html('Connected');
    var ledArray = [0x0000, 0x0001, 0x0002, 0x0004, 0x0008, 0x0010];
    setInterval(function() {
      bluetoothSerial.write('N');
		  for (i = ledArray.length-1; i >= 0 ; i--) { 
        bluetoothSerial.write(String.fromCharCode((ledArray[i]>>16) & 0xff));
	      bluetoothSerial.write(String.fromCharCode((ledArray[i]>>8) & 0xff));
			  bluetoothSerial.write(String.fromCharCode(ledArray[i] & 0xff));
		  }
		bluetoothSerial.read(function (data) {
		console.log(data);
		}, function(){console.log("failure");});
    }, 200);
  },
    function() { 
        $('#connect').html('Connecting...');
        connecting();
    }
); }
