'use strict';

angular.module('GLedMovile.services')
.factory('FileService', function(_, $q,$window, $cordovaFile, $log,$ionicPlatform,$rootScope) {
  var fileService = {};
  var tabList = [];
  var requestedFile;
  read(dirOnFSSuccess);

  function read(fsCallback){
    $ionicPlatform.ready(function() {
      if(ionic.Platform.isAndroid()){
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsCallback, FileError);
      }
    })
  }
  
  function fileOnFSSuccess(fileName,fileSystem){
    fileSystem.root.getFile("guitarraledmobile/tabs/"+fileName,{create:false},saveFile,FileError);
  }
  
  function dirOnFSSuccess(fileSystem) {
    fileSystem.root.getDirectory("guitarraledmobile/tabs/", {create: true, exclusive: false}, doDirectoryListing, FileError);
  }
  
  function saveFile(file){
    requestedFile = file;
    $rootScope.$apply();
  }
  
  function doDirectoryListing(dirEntry) {
    var directoryReader = dirEntry.createReader();
    directoryReader.readEntries(gotFiles, FileError);
  }

  function gotFiles(entries) {
    tabList.length = 0;
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

  fileService.getFile = function(file){
    read(_.partial(fileOnFSSuccess,file));
    return requestedFile;
  }
  
  return fileService;
});
