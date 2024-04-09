document.querySelectorAll('.song').forEach(function(songNew) {
  songNew.addEventListener('click', function() {
    var songIdNew = this.id;
    
    // Get the ID of the clicked song
    // Use the songId to determine which song to play
    // For example:
    // var audio = new Audio('path/to/' + songId + '.mp3');
    // audio.play();
  });
});

// var tracksContainer = document.getElementById('tracksTable');
// var progressBarNewNew = document.getElementById('progressBar');
// tracksContainer.addEventListener('click', function(event) {
//     var target = event.target;
   
//         console.log("123");
//         var currentAudio = target;
//         var progressedBarNewNew = progressBarNewNew.querySelector('.progressedBar');
        
//         var song = document.getElementById('song1');
//         var progressedBar = document.getElementById('progressedBar');
//         var progressBarNew = document.getElementById('progressBar');

//         currentAudio.ontimeupdate = function(e){
//         progressedBar.style.width = Math.floor(currentAudio.currentTime*100/currentAudio.duration)+"%";
//         console.log('playing' , currentAudio.currentTime/currentAudio.duration*100);
//     }

//         progressBarNew.onclick = function(e) {
//         currentAudio.currentTime = ((e.offsetX/progressBar.offsetWidth)*currentAudio.duration);
//         console.log(e.offsetX*100/progressBar.offsetWidth)
//         console.log(currentAudio.duration);
//         console.log(currentAudio);
//     }
    
// });

// funftion to update the progressbar in footer, when the songrow is clicked

    var song = document.getElementById('song1');
    var progressedBar = document.getElementById('progressedBar');
    var progressBarNew = document.getElementById('progressBar');
    audio.ontimeupdate = function(e){
        progressedBar.style.width = Math.floor(currentAudio.currentTime*100/currentAudio.duration)+"%";
        console.log('playing' , currentAudio.currentTime/currentAudio.duration*100);
    }
    progressBarNew.onclick = function(e) {
      currentAudio.currentTime = ((e.offsetX/progressBar.offsetWidth)*currentAudio.duration);
        console.log(e.offsetX*100/progressBar.offsetWidth)
        console.log(currentAudio.duration);
        console.log(currentAudio);
    }


    var tracksContainer = document.getElementById('tracksTable');
    console.log(tracksContainer);
    tracksContainer.addEventListener('click', function(event) {
      var target = event.target;
      if (target.tagName === 'AUDIO') {
          console.log("123");
      }
  });



var currentAudio;
var progressBar = document.getElementById("progressBar");
var currentTimeDisplay = document.getElementById("currentTime");
var songLengthDisplay = document.getElementById("songLength");

// Function to play the audio when clicked
function playAudio(songId) {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    document.getElementById("playPauseIcon").className = "fas fa-play";
  }

  var audio = document.getElementById(songId);
  audio.currentTime = 0;
  audio.play();
  currentAudio = audio;
  document.getElementById("playPauseIcon").className = "fas fa-pause";
  updateProgressBar();
}

// Function to toggle play/pause
function togglePlayPause() {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
      document.getElementById("playPauseIcon").className = "fas fa-pause";
    } else {
      currentAudio.pause();
      document.getElementById("playPauseIcon").className = "fas fa-play";
    }
  }
}



function updateFooter(row) {
  let songImage = row.querySelector("#songImage").src;
  let songName = row.querySelector("#songName").textContent;
  let songAuthor = row.querySelector("#songAuthor").textContent;
  let rowHeartIcon = row.querySelector("#rowHeartIcon").className;

  document.getElementById("footerHeartIcon").className = rowHeartIcon;
  // document.getElementById('footer').style.background = 'white';
  document.getElementById("footerSongImage").style.display = "block";
  document.getElementById("footerSongImage").src = songImage;
  document.getElementById("footerSongName").textContent = songName;
  document.getElementById("footerSongAuthor").textContent = songAuthor;
}