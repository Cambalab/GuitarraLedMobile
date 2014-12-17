'use strict';

angular.module('GLedMovile.services')
.factory('FileService', function(_, $q,$window, $cordovaFile, $log,$ionicPlatform,$rootScope) {
  var fileService = {};
  var tabList;
  $ionicPlatform.ready(function() {
    if(ionic.Platform.isAndroid()){
     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, FileError);
    }
  })

  function onFSSuccess(fileSystem) {
    fileSystem.root.getDirectory("guitarraledmobile/tabs/", {create: false, exclusive: false}, doDirectoryListing, FileError);
  }

  function doDirectoryListing(dirEntry) {
    var directoryReader = dirEntry.createReader();
    directoryReader.readEntries(gotFiles, FileError);
  }

  function gotFiles(entries) {
    tabList = [];
    for(var i=0,len=entries.length; i<len; i++){
      tabList.push(entries[i].name);
    }
    $rootScope.$apply();
  }
 
  function FileError(e) {
    $log.error(e);
  }

  fileService.listTablatures = function(){
    return tabList;
  }
  
  return fileService;
});
