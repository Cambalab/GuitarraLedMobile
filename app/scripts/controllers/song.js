'use strict';

/**
* @ngdoc function
* @name todo.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of the todo
*/

angular.module('<%= appName %>.controllers')
  .controller('SongCtrl',function($scope) {
    var score = alphatab.importer.ScoreLoader.loadScoreAsync("Canon.gp5",function(score) {
      console.log(score);
      $scope.song = toJson(score);
    }, function(error) {
      console.error(error);
    });
  });
function toJson(score) {
    var json = {
        album: score.album,
        artist: score.artist,
        copyright: score.copyright,
        // .. and the rest of the score properties    

        masterBars: [],
        tracks: []
    };

    // MasterBars
    for(var i = 0; i < score.masterBars.length; i++) {
        var masterBar = score.masterBars[i];
        json.masterBars.push({
            timeSignatureNumerator: masterBar.timeSignatureNumerator,
            timeSignatureDenominator: masterBar.timeSignatureDenominator,
            // .. and the rest of the properties
        });
    }

    // Tracks
    for(var t = 0; t < score.tracks.length; t++) {
        var track = score.tracks[t];
        var trackJson = {
            name: track.name,
            // .. and the rest of the properties

            bars: []
        };
        json.tracks.push(trackJson);
        // Bars
        for(var b = 0; b < track.bars.length; b++) {
            var bar = track.bars[b];
            var barJson = {
                clef: bar.clef,
                // .. and the rest of the properties
                voices: []
            };
            trackJson.bars.push(barJson);

            // Voices
            for(var v = 0; v < bar.voices.length; v++) {
                var voice = bar.voices[v];
                var voiceJson = {
                    isEmpty: voice.isEmpty,
                    // .. and the rest of the properties
                    beats: []
                };
                barJson.voices.push(voiceJson);

                // Beats
                for(var bt = 0; bt < voice.beats.length; bt++) {
                    var beat = voice.beats[bt];
                    var beatJson = {
                        isEmpty: beat.isEmpty,
                        // .. and the rest of the properties
                        notes: []
                    };
                    voiceJson.beats.push(beatJson);

                    // Notes
                    for(var n = 0; n < beat.notes.length; n++) {
                        var note = beat.notes[n];
                        var noteJson = {
                            fret: note.fret,
                            string: note.string
                            // // .. and the rest of the properties
                        };
                        beatJson.notes.push(noteJson);
                    } // Notes                    
                } // Beats                
            } // Voices            
        } // Bars       
    } // Tracks

    return JSON.stringify(json);
}
