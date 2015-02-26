'use strict';

/**
* @ngdoc function
* @name todo.controller:GLedCtrl
* @description
* # GLedCtrl
* Controller of the todo
*/

angular.module('GLedMovile.controllers')
  .controller('SongCtrl',function($scope,$stateParams,$ionicScrollDelegate, FileService,$log) {
    var file = $stateParams.songName;
    var title = file.replace(/\.[^/.]+$/, "");
    var bytes;

    var playerScroll = $ionicScrollDelegate.$getByHandle('player-scroll');

    var song = {
      "title": title,
      "artist": "",
      "timeSignature": [4, 4],
      "tempo": 80,
      "vexTabCode": ""
    };
    $scope.song = song;

    FileService.getFile(file).then(function(data){
      bytes = alphatab.platform.js.JsFileLoader.getBytesFromTyped(data);
      $log.debug(bytes);

      var score = alphatab.importer.ScoreLoader.loadScoreFromBytes(bytes);
      var _score = toJson(score);

      $scope.song.vexTabCode = toVexTabCode( score );
      $scope.song.artist = _score.artist;
      $scope.$apply();
    }, function(e){$log.error(e)} );

    // modificado por la directiva vexplayer
    $scope.player = { };

    $scope.onNoteOn = function(positions) {
      var payload = { 'detail': { 'current': { 'position': positions }}};
      var ev = new CustomEvent('note', payload);

      document.dispatchEvent(ev);
    };

    $scope.onUpdateMarker = function(x,y, note) {
        var zoom = playerScroll.getScrollView().getValues().zoom;
        var stave = note.getStave();
        var options = stave.options;
        var y = stave.y - options.space_above_staff_ln * options.spacing_between_lines_px;

        ps.scrollTo(x*zoom,y*zoom);
    };

});

function toVexTabCode(json){
  var code = "tabstave notation=true key=G time=4/4 \n notes ";
  if(json.tracks.length>0){
    for (var b=0; b < json.tracks[0].bars.length; b++){
      var bar = json.tracks[0].bars[b];
      if(bar.voices.length>0){
        for (var bt=0; bt < bar.voices[0].beats.length; bt++){
          var beat = bar.voices[0].beats[bt];
          var duration = durationAlphaToVex(beat.duration[0]);
          code = code + duration;
          if(beat.notes.length==1){
            code = code + " " + noteAlphaToVex(beat.notes[0])+ " ";
          }
          if(beat.notes.length>1){
            var needsPoint = false;
            code = code + " (";              
            for (var n=0; n < beat.notes.length; n++){
              var note = beat.notes[n];
              if (needsPoint){
                code = code + "." + noteAlphaToVex(note);
              }
              else {
                code = code + noteAlphaToVex(note);
              }
              needsPoint = true;
            }
            code = code + ") ";
          }            
        }
      }
    }
  }
  return code;
}

function noteAlphaToVex(note){
  return note.fret + "/" + (7 - note.string);
}

function durationAlphaToVex(duration){
  var noteDuration;
    switch (duration) {
      case "Whole":
        noteDuration = ":w";
        break;
      case "Half":
        noteDuration = ":h";
        break;
      case "Quarter":
        noteDuration = ":q";
        break;
      case "Eighth":
        noteDuration = ":8";
        break;
      case "Sixteenth":
        noteDuration = ":16";
        break;
      case "Thirty-second":
        noteDuration = ":32";
        break;
      case "Sixty-fourth":
        noteDuration = ":64";
        break;
    }
    return noteDuration;
}

function toJson(score) {
    var json = {
        album: score.album,
        artist: score.artist,
        copyright: score.copyright,
        masterBars: [],
        tracks: []
    };

    // MasterBars
    for(var i = 0; i < score.masterBars.length; i++) {
        var masterBar = score.masterBars[i];
        json.masterBars.push({
            timeSignatureNumerator: masterBar.timeSignatureNumerator,
            timeSignatureDenominator: masterBar.timeSignatureDenominator,
        });
    }

    // Tracks
    for(var t = 0; t < score.tracks.length; t++) {
        var track = score.tracks[t];
        var trackJson = {
            name: track.name,
            bars: []
        };
        json.tracks.push(trackJson);
        // Bars
        for(var b = 0; b < track.bars.length; b++) {
            var bar = track.bars[b];
            var barJson = {
                clef: bar.clef,
                voices: []
            };
            trackJson.bars.push(barJson);

            // Voices
            for(var v = 0; v < bar.voices.length; v++) {
                var voice = bar.voices[v];
                var voiceJson = {
                    isEmpty: voice.isEmpty,
                    index: voice.index,
                    beats: []
                };
                barJson.voices.push(voiceJson);

                // Beats
                for(var bt = 0; bt < voice.beats.length; bt++) {
                    var beat = voice.beats[bt];
                    var beatJson = {
                        isEmpty: beat.isEmpty,
                        duration: beat.duration,
                        notes: []
                    };
                    voiceJson.beats.push(beatJson);

                    // Notes
                    for(var n = 0; n < beat.notes.length; n++) {
                        var note = beat.notes[n];
                        var noteJson = {
                            fret: note.fret,
                            string: note.string
                        };
                        beatJson.notes.push(noteJson);
                    } // Notes
                } // Beats
            } // Voices
        } // Bars
    } // Tracks

    return json;
}
