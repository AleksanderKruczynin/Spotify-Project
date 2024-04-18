var songs = document.querySelectorAll("audio");
var progressedBar = document.getElementById("progressedBar");
var progressBarNew = document.getElementById("progressBar2");
var currentAudio;
var progressBar = document.getElementById("progressBar");
var currentTimeDisplay = document.getElementById("currentTime");
var songLengthDisplay = document.getElementById("songLength");
var leftTime = document.getElementById("leftTime");
var rightTime = document.getElementById("rightTime");
leftTime.innerText = "0:00";
rightTime.innerText = "0:00";
const volumeIcon = document.querySelector(".volumeIcon");
volumeBar = document.getElementById("volumeBar");
volumeRangeInput = document.getElementById("volumeRange");
let previousVolume = 0.25;

// this function will start the song you will choose, +loads the footer funstionallity
function playAudio(songId) {
  console.log("audio clicked");
  if (currentAudio != undefined){
    currentAudio.parentElement.style.backgroundColor = "transparent";
  } 
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    document.getElementById("playPauseIcon").className = "fas fa-play";
    document.getElementById("playPauseIcon2").className = "fas fa-play fa-xl";
  }
  currentAudio = document.getElementById(songId);
  currentAudio.currentTime = 0;
  currentAudio.play();
  document.getElementById("playPauseIcon").className = "fas fa-pause";
  document.getElementById("playPauseIcon2").className = "fas fa-pause fa-xl";
  rightTime.innerText = formatTime(currentAudio.duration);
  currentAudio.ontimeupdate = updateTimeDisplay;
  currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
  currentAudio.volume = previousVolume;
}

// function that adds hover effect to current song in the tracksTable
function bgActiveEffect() {
  if(currentAudio !== undefined && currentAudio.parentElement !== null) {
      currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
  }
}

// changes the footer when song is started 
function updateFooter(row) {
  var songImage = row.querySelector("#songImage").src;
  var songName = row.querySelector("#songName").textContent;
  var songAuthor = row.querySelector("#songAuthor").textContent;
  var rowHeartIcon = row.querySelector("#rowHeartIcon").className;

  document.getElementById("footerHeartIcon").className = rowHeartIcon;
  document.getElementById("footerSongImage").style.display = "block";
  document.getElementById("footerSongImage").src = songImage;
  document.getElementById("footerSongName").textContent = songName;
  document.getElementById("footerSongAuthor").textContent = songAuthor;
}

// functionallity of the backSong button
function backSong(){
  currentAudio.parentElement.style.backgroundColor = "transparent";
  if(currentAudio.currentTime < 3){
    currentAudio.pause();
    let songId = currentAudio.id;
    let prefix = songId.match(/[a-zA-Z]+/)[0];
    let number = parseInt(songId.match(/\d+/)[0]);
    number--;
    let result = prefix + number;
    currentAudio = document.getElementById(result);
    if(currentAudio === null){
      currentAudio = document.getElementById('song6');
    }
    currentAudio.play();
  currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
    console.log("previous song choosen");
    let songImage = currentAudio.parentElement.querySelector("#songImage").src;
  let songName = currentAudio.parentElement.querySelector("#songName").textContent;
  let songAuthor = currentAudio.parentElement.querySelector("#songAuthor").textContent;
  document.getElementById("footerSongImage").src = songImage;
  document.getElementById("footerSongName").textContent = songName;
  document.getElementById("footerSongAuthor").textContent = songAuthor;
  rightTime.innerText = formatTime(currentAudio.duration);
  currentAudio.ontimeupdate = updateTimeDisplay;   
  currentAudio.currentTime = 0;
  currentAudio.volume = previousVolume;
    return;
  
  }
  if(currentAudio.currentTime > 2){

    currentAudio.currentTime = 0;
  currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
    console.log("the song is started from the beginning.")
  }
}

// functionallity of the play-pause button
function togglePlayPause() {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
      document.getElementById("playPauseIcon").className = "fas fa-pause";
      document.getElementById("playPauseIcon2").className =
        "fas fa-pause fa-xl";
    } else {
      currentAudio.pause();
      document.getElementById("playPauseIcon").className = "fas fa-play";
      document.getElementById("playPauseIcon2").className = "fas fa-play fa-xl";
    }
  }
}

// functionallity of the skipSong button
function skipSong(){
  currentAudio.parentElement.style.backgroundColor = "transparent";
  currentAudio.pause();
  let songId = currentAudio.id;
  let prefix = songId.match(/[a-zA-Z]+/)[0];
  let number = parseInt(songId.match(/\d+/)[0]);
  number++;
  let result = prefix + number;
  currentAudio = document.getElementById(result);
  if(currentAudio === null){
    currentAudio = document.getElementById('song1');
  }
  let songImage = currentAudio.parentElement.querySelector("#songImage").src;
  let songName = currentAudio.parentElement.querySelector("#songName").textContent;
  let songAuthor = currentAudio.parentElement.querySelector("#songAuthor").textContent;
  document.getElementById("footerSongImage").src = songImage;
  document.getElementById("footerSongName").textContent = songName;
  document.getElementById("footerSongAuthor").textContent = songAuthor;
  rightTime.innerText = formatTime(currentAudio.duration);
  currentAudio.ontimeupdate = updateTimeDisplay;   
  currentAudio.currentTime = 0;
  if (currentAudio.paused) {
    currentAudio.play();
    document.getElementById("playPauseIcon").className = "fas fa-pause";
    document.getElementById("playPauseIcon2").className =
      "fas fa-pause fa-xl";
  }
  console.log("song skipped, the next song is " + currentAudio.id)
  currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
  currentAudio.volume = previousVolume;
}

// for example: instead 150 -> 2:30
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}
// function that update time each 0.1s + checks if the song is ended to start next one
function updateTimeDisplay() {
  leftTime.innerText = formatTime(currentAudio.currentTime);
  if (currentAudio.duration > 0) {
    var progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressedBar.style.width = progress + "%";
  }
  let tolerance = 0.3;
  if (currentAudio.duration - currentAudio.currentTime < tolerance) {
    skipSong();
  }
}

// function that changes the lengh of the song
progressBarNew.onclick = function (e) {
  var offsetX = e.offsetX || e.layerX;
  var progressBarWidth = progressBarNew.offsetWidth;
  songs.forEach(function (song) {
    if (song.duration > 0) {
      song.currentTime = (offsetX / progressBarWidth) * song.duration;
    }
  });
  console.log((offsetX * 100) / progressBarWidth);
};

// function that change the volume of the song
volumeBar.onclick = function (b) {
  let offsetX = b.offsetX || b.layerX;
  let volumeBarWidth = volumeBar.offsetWidth;
  let newVolumeRange = offsetX / volumeBarWidth;
  let newVolumeValue = newVolumeRange * 1;
  currentAudio.volume = newVolumeValue;
  previousVolume = newVolumeValue;
  volumeRangeInput.value = newVolumeRange.toFixed(2);
  volumedRange = document.getElementById("volumedRange");
  volumedRange.style.width = currentAudio.volume * 100 + "%";
  console.log("new volume = " + (currentAudio.volume * 100).toFixed(2) + " %");
};

// functionallity of the mute button
function toggleVolume() {
  if (volumedRange.style.width === "0%") {
    volumedRange.style.width = previousVolume + "%";
    currentAudio.volume =
      parseFloat(volumedRange.style.width.replace("%", "")) / 100;
  }
  else {
    previousVolume = parseInt(volumedRange.style.width, 10);
    volumedRange.style.width = "0%";
    currentAudio.volume = 0;
  }
}
volumeIcon.addEventListener("click", toggleVolume);

// these 2 functions add the hover Effect to the volumebar
volumeIcon.addEventListener("mouseover", function () {
  volumedRange.style.backgroundColor = "#1ed760";
  volumedRange.classList.add("showAfter");
});
// 2nd part
volumeIcon.addEventListener("mouseout", function () {
  volumedRange.style.backgroundColor = "";
  volumedRange.classList.remove("showAfter");
});
