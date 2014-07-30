'use strict';

/**
* @ngdoc function
* @name todo.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of the todo
*/

angular.module('gledmobile.controllers', [])
  .controller('GLedCtrl',function($scope,$location, $ionicModal, $translate) {
    $scope.guitars = [];
    $scope.guitar = { item: '' };

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    $ionicModal.fromTemplateUrl('views/add-guitar.html', function(modal) {
      $scope.guitarModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.createGuitar = function() {
      var item = this.guitar.alias;
      if(!item) { return; }

      $scope.guitars.push({
        title: item
      });
      $scope.guitarModal.hide();
      this.guitar.title = '';
    };

    $scope.addGuitar = function() {
      $scope.guitarModal.show();
    };

    $scope.closeAddGuitar = function() {
      $scope.guitarModal.hide();
    };
    
    $scope.removeGuitar = function (index) {
      $scope.guitars.splice(index, 1);
    };
    $scope.go = function ( path ) {
      $location.path( path );
    };
  }).controller('SongsCtrl',function($scope) {
	  $scope.songs = [
                { name: "Green River", author: "Creedence" },
                { name: "Mi Vieja", author: "Pappo" },
                { name: "Asesíname", author: "Charly Garcia" },
                { name: "Juntos a la Par", author: "Pappo" },
                { name: "Snow", author: "Red Hot Chili Peppers" },
                { name: "Smoke on the Water", author: "Deep Purple" }
            ];
	  });


