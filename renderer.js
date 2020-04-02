const Fs = require('fs')
const util = require('util');
const path = require('path');
var mp3Duration = require('mp3-duration');
var jsmediatags = require("jsmediatags");
const directoryPath = '/Users/Usuario/Music';
const titulo = document.getElementById('title');
const artista = document.getElementById('artist');
const album = document.getElementById('album');
const imagen = document.getElementById('picture');
const genero = document.getElementById('genere');
const cancion = document.getElementsByClassName('cancion');


mp3Duration('./musica/JekK_-_You_and_Me.mp3', function (err, duration) {
  document.getElementById('tiempo').innerHTML = time_convert(duration);
});

function createdDate (file) {  
  const { birthtime } = Fs.statSync(file)
  return birthtime
}

function time_convert(num)
 { 
  var minutes = Math.floor(num / 60);
  var residual = Math.floor(num % 60);
  if(residual < 10){
    seconds = "0"+residual+""
    return minutes + ":" + seconds;
  }else{
    return minutes + ":" + residual;
  }
           
}

jsmediatags.read("./musica/JekK_-_You_and_Me.mp3", {
  onSuccess: function(tag) {
    console.log(tag);
    var image = tag.tags.picture;
    document.getElementById('title').innerHTML = tag.tags.title;
    document.getElementById('artist').innerHTML= tag.tags.artist;
    document.getElementById('album').innerHTML = tag.tags.album;
    document.getElementById('picture').title = tag.tags.title;
    document.getElementById('genere').innerHTML = tag.tags.genre; 
      if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
        document.getElementById('picture').setAttribute('src',base64);
      } else {
        document.getElementById('picture').style.display = "none";
        document.getElementById('picture').title = "none";
      }
  },
  onError: function(error) {
    console.log(':(', error.type, error.info);
  }
});

function startplayer() 
{
 player = document.getElementById('music_player');
 player.controls = false;
}

function play_aud() 
{
 player.play();
} 
function pause_aud() 
{
 player.pause();
}
function stop_aud() 
{
 player.pause();
 player.currentTime = 0;
}
function change_vol()
{
 player.volume=document.getElementById("change_vol").value;
}

Fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  let html = '<p>';
  files.forEach(function (file) {
    jsmediatags.read(file, {
      onSuccess: function(tag) {
        console.log(tag);
        var image = tag.tags.picture;
        html += `<h1>${file.tag.tags.titulo}</h1>`;
        html += `<h2>${file.tag.tags.artist}</h2>`;
          if (image) {
            var base64String = "";
            for (var i = 0; i < image.data.length; i++) {
                base64String += String.fromCharCode(image.data[i]);
            }
            var base64 = "data:" + image.format + ";base64," +
                    window.btoa(base64String);
            document.getElementById('picture').setAttribute('src',base64);
          } else {
            document.getElementById('picture').style.display = "none";
            document.getElementById('picture').title = "none";
          }
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    });
  });
  html +="</p>"
  cancion.innerHTML = html;
});
