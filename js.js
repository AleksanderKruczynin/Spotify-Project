var songs = document.querySelectorAll("audio");
var progressedBar = document.getElementById("progressedBar");
var progressBarNew = document.getElementById("progressBar2");

//
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

var currentAudio;
var progressBar = document.getElementById("progressBar");
var currentTimeDisplay = document.getElementById("currentTime");
var songLengthDisplay = document.getElementById("songLength");

var leftTime = document.getElementById("leftTime");
var rightTime = document.getElementById("rightTime");
leftTime.innerText = "0:00";
rightTime.innerText = "0:00";


// this function set the default volume to 0.25 when the page is loaded.
document.addEventListener("DOMContentLoaded", function() {
  let currentAudio = document.getElementById("song1");
  currentAudio.volume = 0.25; 
  currentAudio.parentElement.style.backgroundColor = "transparent";
});

// this function will start the song you will choose, +loads the footer funstionallity
function playAudio(songId) {
  console.log("audio clicked");
  if (currentAudio === undefined){
    var defaultVolume = 0.25;
  } 
  else{
    defaultVolume = currentAudio.volume;
    currentAudio.parentElement.style.backgroundColor = "transparent";
  }
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    document.getElementById("playPauseIcon").className = "fas fa-play";
    document.getElementById("playPauseIcon2").className = "fas fa-play fa-xl";
  }
  currentAudio = document.getElementById(songId);
  currentAudio.currentTime = 0;
  if(currentAudio.volume != defaultVolume){
    currentAudio.volume = defaultVolume;
  }
  currentAudio.play();
  document.getElementById("playPauseIcon").className = "fas fa-pause";
  document.getElementById("playPauseIcon2").className = "fas fa-pause fa-xl";
  rightTime.innerText = formatTime(currentAudio.duration);
  currentAudio.ontimeupdate = updateTimeDisplay;
  currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
}

volumeBar = document.getElementById("volumeBar");
volumeRangeInput = document.getElementById("volumeRange");

volumeBar.onclick = function (b) {
  var offsetX = b.offsetX || b.layerX;
  var volumeBarWidth = volumeBar.offsetWidth;

  var newVolumeRange = offsetX / volumeBarWidth;
  var newVolumeValue = newVolumeRange * 1;

  currentAudio.volume = newVolumeValue;
  volumeRangeInput.value = newVolumeRange.toFixed(2);

  volumedRange = document.getElementById("volumedRange");
  volumedRange.style.width = currentAudio.volume * 100 + "%";
  console.log(
    "playing",
    (currentAudio.currentTime / currentAudio.duration) * 100
  );

  console.log(currentAudio.volume);
};

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

const volumeIcon = document.querySelector(".volumeIcon");
let previousVolume = 0;

function toggleVolume() {
  if (volumedRange.style.width === "0%") {
    volumedRange.style.width = previousVolume + "%";
    currentAudio.volume =
      parseFloat(volumedRange.style.width.replace("%", "")) / 100;
  } else {
    previousVolume = parseInt(volumedRange.style.width, 10);
    volumedRange.style.width = "0%";
    currentAudio.volume = 0;
  }
}

volumeIcon.addEventListener("click", toggleVolume);

volumeIcon.addEventListener("mouseover", function () {
  volumedRange.style.backgroundColor = "#1ed760";
  volumedRange.classList.add("showAfter");
});

volumeIcon.addEventListener("mouseout", function () {
  volumedRange.style.backgroundColor = "";
  volumedRange.classList.remove("showAfter");
});

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

function updateTimeDisplay() {
  leftTime.innerText = formatTime(currentAudio.currentTime);
  if (currentAudio.duration > 0) {
    var progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressedBar.style.width = progress + "%";
  }
  // let tolerance = 1;
  // if(currentAudio.duration - currentAudio.currentTime < tolerance){
  //   skipSong();
  //   console.log("the song has ended, started next song");
  // }
  let tolerance = 0.3;
  if (currentAudio.duration - currentAudio.currentTime < tolerance) {
    skipSong();
  }
}
function bgActiveEffect() {
  if(currentAudio !== undefined && currentAudio.parentElement !== null) {
      currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
  }
}
// function bgActiveEffectRemove() {
//   if(currentAudio !== undefined && currentAudio.parentElement !== null) {
//       currentAudio.parentElement.style.backgroundColor = "transparent";
//   }
// }

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

// this script add the whole functionallity for the "skipSong" button
function skipSong(){
  // currentAudio.addEventListener("playing", bgActiveEffectRemove);
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
}
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
    return;
  }
  if(currentAudio.currentTime > 2){

    currentAudio.currentTime = 0;
  currentAudio.parentElement.style.backgroundColor = "hsla(0,0%,100%,.3)";
    console.log("the song is started from the beginning.")
  }
}
// function skipSong() {
//   currentAudio.pause;
//   var test = currentAudio.id;
//   var prefix = test.match(/[a-zA-Z]+/)[0];
//   var number = parseInt(test.match(/\d+/)[0]);
//   number++;
//   var result = prefix + number;
//   currentAudio = document.getElementById(result);

//   if (currentAudio === null) {
//     result = "song1";
//     currentAudio = document.getElementById(result);
//   }

//   // Set up an event listener for the "play" event
//   currentAudio.addEventListener("play", function () {
//     var songRow = currentAudio.parentElement;
//     updateFooter(songRow);
//     updateTimeDisplay();
//     rightTime.innerText = formatTime(currentAudio.duration);
//     console.log("playing test");
//   });

//   currentAudio.currentTime = 0;
//   currentAudio.play();
//   console.log("next song");
// }

// function backSong() {
//   currentAudio.pause;
//   if (currentAudio.currentTime >= 2) {
//     currentAudio.currentTime = 0;
//     currentAudio.play();
//     console.log("start from beginning");
//   }
//   if (currentAudio.currentTime < 2) {
//     var prefix = currentAudio.id.match(/[a-zA-Z]+/)[0];
//     var number = parseInt(currentAudio.id.match(/\d+/)[0]);
//     number--;
//     var result = prefix + number;
//     currentAudio = document.getElementById(result);

//     if (currentAudio === null) {
//       result = "song6";
//       currentAudio = document.getElementById(result);
//       console.log("no more songs are above, starting from end");
//     } 
//     else {
//       currentAudio.addEventListener("play", function () {
//         var songRow = currentAudio.parentElement;
//         updateFooter(songRow);
//         updateTimeDisplay();
//         rightTime.innerText = formatTime(currentAudio.duration);
//       });

//       currentAudio.currentTime = 0;
//       currentAudio.play();
//       console.log("previous song");
//     }
//   }
// }
