'use strict';

angular.module('GLedMovile.services')
.factory('FileService', function(_, $q,$window, $cordovaFile, $log,$ionicPlatform) {
  var fileService = {};
  $ionicPlatform.ready(function() {
  window.resolveLocalFileSystemURL($cordovaFile.applicationDirectory + "www/index.html", gotFile, fail);
  })
  
  fileService.listTablatures = function(){
    $log.debug($cordovaFile);
  }
  
  function fail(e) {
	$log.debug("FileSystem Error");
	$log.error(e);
  }

  function gotFile(fileEntry) {

	fileEntry.file(function(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			$log.debug("Text is: "+this.result);
			document.querySelector("#textArea").innerHTML = this.result;
		}

		reader.readAsText(file);
	});
  }
  
  return fileService;
});
