'use strict';
angular.module('GLedMovile.services', []);
angular.module('GLedMovile.services')
.factory('ChordService', function(_) {
  
  var chords = [
    { name: "C", abc: "|CEGc|", hex:"" },
    { name: "D", abc: "", hex:"" },
    { name: "E", abc: "", hex:"" },
    { name: "F", abc: "", hex:"" },
    { name: "G", abc: "", hex:"" },
    { name: "A", abc: "", hex:"" },
    { name: "B", abc: "", hex:"" },
    { name: "Cm", abc: "", hex:"" },
    { name: "Dm", abc: "", hex:"" },
    { name: "Em", abc: "", hex:"" },
    { name: "Fm", abc: "", hex:"" },
    { name: "Gm", abc: "", hex:"" },
    { name: "Am", abc: "", hex:"" },
    { name: "Bm", abc: "", hex:"" },
    { name: "C#", abc: "", hex:"" },
    { name: "D#", abc: "", hex:"" },
    { name: "F#", abc: "", hex:"" },
    { name: "G#", abc: "", hex:"" },
    { name: "A#", abc: "", hex:"" }
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
