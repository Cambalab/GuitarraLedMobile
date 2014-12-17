'use strict';
angular.module('GLedMovile.services', []);
angular.module('GLedMovile.services')
.factory('ChordService', function(_) {
  
  var roots = "CDEFGAB";
  var allChords = {};

  var simpleChords = [
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

  var __alljtChords = _.keys(jtab.Chords);

  allChords = _.groupBy(__alljtChords, function(chordname) { return chordname[0]; });

  var chordNameToPositions = function(chordName) {
    var positions = [];
    var chord = new jtabChord(chordName);

    if (!chord.isValid) {
      return positions;
    }

    var _chord = _.rest(chord.chordArray, 1);

    _.each(_chord, function(fpos, string) {
      var string = 6 - string;  // de 1 a 6 pero en orden reverso.
      var fret = fpos[0];

      if (fret == -1) {
        return;
      }

      positions.push({fret:fret, str:string});
    });
    return positions;
  }

  return {
    all: allChords,
    get: function(chordName) {
      return _.findWhere(simpleChords,{name:chordName});
    },
    roots: roots,
    chordNameToPositions: chordNameToPositions,
  };
});
