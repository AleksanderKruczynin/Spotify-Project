
var songs = document.querySelectorAll('audio');
var progressedBar = document.getElementById('progressedBar');
var progressBarNew = document.getElementById('progressBar2');


progressBarNew.onclick = function(e) {
    var offsetX = e.offsetX || e.layerX;
    var progressBarWidth = progressBarNew.offsetWidth;
    songs.forEach(function(song) {
        if (song.duration > 0) {
            song.currentTime = (offsetX / progressBarWidth) * song.duration;
        }
    });
    console.log(offsetX * 100 / progressBarWidth);
};



    var tracksContainer = document.getElementById('tracksTable');
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

var leftTime = document.getElementById("leftTime");
var rightTime = document.getElementById("rightTime");
leftTime.innerText = "0:00";
rightTime.innerText = "0:00";

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

function updateTimeDisplay() {
  leftTime.innerText = formatTime(currentAudio.currentTime);
  
  if (currentAudio.duration > 0) {
    var progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressedBar.style.width = progress + "%";
  }
}

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

  rightTime.innerText = formatTime(currentAudio.duration);

  currentAudio.ontimeupdate = updateTimeDisplay;
  currentAudio.volume = currentAudio.volume / 2;
}

volumeBar = document.getElementById('volumeBar');
volumeRangeInput = document.getElementById('volumeRange');

volumeBar.onclick = function(b) {
  var offsetX = b.offsetX || b.layerX;
  var volumeBarWidth = volumeBar.offsetWidth;
  
  var newVolumeRange = offsetX / volumeBarWidth;
  var newVolumeValue = newVolumeRange * 1; 
  
  currentAudio.volume = newVolumeValue;
  volumeRangeInput.value = newVolumeRange.toFixed(2); 
  
  volumedRange = document.getElementById('volumedRange')
  volumedRange.style.width = currentAudio.volume * 100 + "%";
  console.log('playing', currentAudio.currentTime / currentAudio.duration * 100);

  console.log(currentAudio.volume);

};

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
  document.getElementById("footerSongImage").style.display = "block";
  document.getElementById("footerSongImage").src = songImage;
  document.getElementById("footerSongName").textContent = songName;
  document.getElementById("footerSongAuthor").textContent = songAuthor;
}
 const volumeIcon = document.querySelector('.volumeIcon');
let previousVolume = 0;

function toggleVolume() {
  if (volumedRange.style.width === '0%') {
    volumedRange.style.width = previousVolume + '%';
    currentAudio.volume = parseFloat(volumedRange.style.width.replace('%', '')) / 100;
  } else {
    previousVolume = parseInt(volumedRange.style.width, 10);
    volumedRange.style.width = '0%';
    currentAudio.volume = 0;
  }
}

volumeIcon.addEventListener('click', toggleVolume);
  

 volumeIcon.addEventListener('mouseover', function() {
   volumedRange.style.backgroundColor = '#1ed760'; 
   volumedRange.classList.add('showAfter');
 });

 volumeIcon.addEventListener('mouseout', function() {
   volumedRange.style.backgroundColor = ''; 
   volumedRange.classList.remove('showAfter');
 });
 
