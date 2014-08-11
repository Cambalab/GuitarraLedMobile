'use strict';
angular.module('<%= appName %>.services', []);
angular.module('<%= appName %>.services')
.factory('ChordService', function(_) {
  
  var chords = [
    { name: "C", abc: "|CEGc|", hex:"" }
  ];

  return {
    all: function() {
      return chords;
    },
    get: function(chordName) {
      return _.findWhere(chords,{name:chordName});
    }
  };
});
