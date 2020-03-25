const Fs = require('fs')
const mm = require('music-metadata');
const util = require('util');
var mp3Duration = require('mp3-duration');
var jsmediatags = require("jsmediatags");
const resultados = document.getElementById('resultados')

mp3Duration('./musica/JekK_-_You_and_Me.mp3', function (err, duration) {
  const tiempo = time_convert(duration/60)
  console.log('Your file is ' + duration + ' seconds long');
  let html = '<form>';
  html += `<h3>${tiempo}</h3>`;
  html += `<h3>${createdDate('./musica/JekK_-_You_and_Me.mp3')}</h3>`
  html +="</form>"
  resultados.innerHTML = html;
});

function createdDate (file) {  
  const { birthtime } = Fs.statSync(file)
  return birthtime
}

function time_convert(num)
 { 
  var seconds = Math.floor(num / 60);  
  var minutes = num % 60;
  return minutes + ":" + seconds;         
}

jsmediatags.read("./musica/JekK_-_You_and_Me.mp3", {
  onSuccess: function(tag) {
    console.log(tag);
    var image = tag.tags.picture;
    document.getElementById('title').innerHTML = tag.tags.title;
    document.getElementById('artist').innerHTML= tag.tags.artist;
    document.getElementById('album').innerHTML = tag.tags.album;
    document.getElementById('picture').title = tag.tags.title;
    document.getElementById('genero').innerHTML = tag.tags.genre; 
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

mm.parseFile('./musica/JekK_-_You_and_Me.mp3')
  .then( metadata => {
    console.log(util.inspect(metadata, { showHidden: false, depth: null }));
  })
  .catch( err => {
    console.error(err.message);
  });