'use strict';

angular.module('GLedMobile.services')
.factory('FileService', function(_, $q,$window, $cordovaFile, $log,$ionicPlatform,$rootScope) {
  var fileService = {};
  var tabList = [];
  var requestedFile = "";
  read(dirOnFSSuccess);

  function read(fsCallback){
    $ionicPlatform.ready(function() {
      if(ionic.Platform.isAndroid()){
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsCallback, FileError);
      }
    })
  }
  
  function fileOnFSSuccess(fileName,fileSystem,dfd){
    fileSystem.root.getFile("guitarraledmobile/tabs/"+fileName,{create:false},_.partial(saveFile,dfd),_.partial(FileError,_,dfd));
  }
  
  function dirOnFSSuccess(fileSystem) {
    fileSystem.root.getDirectory("guitarraledmobile/tabs/", {create: true, exclusive: false}, doDirectoryListing, FileError);
  }
  
  function saveFile(dfd,fileEntry){
    var reader = new FileReader();
    reader.onload = function() {
      var generatedBuffer = reader.result;
      dfd.resolve(generatedBuffer);
    };
    
    fileEntry.file(function(file){
      reader.readAsArrayBuffer(file);
    });
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
 
  function FileError(e,dfd) {
    if(!_.isUndefined(dfd)){
      dfd.reject(e);
    }
    $log.error(e);
  }

  fileService.listTablatures = function(){
    return tabList;
  }

  fileService.getFile = function(file){
    var deferred = $q.defer();
    read(_.partial(fileOnFSSuccess,file,_,deferred));
    return deferred.promise;
  }
  
  return fileService;
});
