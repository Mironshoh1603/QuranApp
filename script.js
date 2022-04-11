const suraContainer = document.querySelector(".suraname");
const AyatName = document.querySelector(".heading-secondary");
let data, dataReciter, dataLang, htmlName;
const realQuranText = document.querySelector(".real-section");
const translateText = document.querySelector(".translation-section");
let suras = document.querySelector(".input_sura");
const reciter = document.querySelector(".input_reciter");
const language = document.querySelector(".input_translate");
await fetch("https://api.quran.sutanlab.id/surah")
  .then((response) => response.json())
  .then((res) => {
    data = res.data;
  });
await fetch("https://api.alquran.cloud/v1/edition?format=audio")
  .then((response) => response.json())
  .then((res) => {
    dataReciter = res.data;
  });
await fetch("https://api.alquran.cloud/v1/edition/language")
  .then((response) => response.json())
  .then((res) => {
    dataLang = res.data;
  });
// console.log(data[0].name.transliteration["en"]);
reciter.innerHTML = "";
suraContainer.innerHTML = "";
language.innerHTML = "";
data.forEach((element, key) => {
  // htmlName = `<option value="${key}">${element.name.transliteration["en"]}</option>`;
  htmlName = `<div class="sura" suraNumber="${element.number}">
  <div class="suraLeft">
    <div class="suraNumber"><p class="numbervalue">${element.number}</p></div>
    <div class="suraLeftText">
      <p1 class="suranametext">${element.name.transliteration.en}</p1>
      <p1 class="suratype">${element.revelation.id}</p1>
    </div>
  </div>
  <div class="suraRight">
    <p class="arabicName">${element.name.short}</p>
    <p1 class="suradecription">${element.numberOfVerses} ayats</p1>
  </div>
  </div>`;
  suraContainer.insertAdjacentHTML("beforeend", htmlName);
});
dataReciter.forEach((element, key) => {
  htmlName = `<option value="${key}">${element.identifier}</option>`;
  reciter.insertAdjacentHTML("beforeend", htmlName);
});
dataLang.forEach((element, key) => {
  htmlName = `<option value="${element}">${element}</option>`;
  language.insertAdjacentHTML("beforeend", htmlName);
});

suraContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.closest(".sura")) {
    realQuranText.innerHTML = "";
    translateText.innerHTML = "";
    let sura = e.target.closest(".sura");
    document.querySelectorAll(".sura").forEach((element) => {
      element.classList.remove("background-blue");
    });
    sura.classList.add("background-blue");
    let suranum = sura.getAttribute("suraNumber");
    fetch(`https://api.alquran.cloud/v1/surah/${suranum}`)
      .then((response) => response.json())
      .then((res) => {
        AyatName.innerHTML = `${res.data.englishName} ${res.data.name}`;
        res.data.ayahs.forEach((element) => {
          realQuranText.innerHTML += `${element.text}`;
        });
      });
    fetch(`https://api.alquran.cloud/v1/edition/language/${language.value}`)
      .then((response) => response.json())
      .then((res) => {
        let domla = res.data[0].identifier;
        fetch(`https://api.alquran.cloud/v1/surah/${suranum}/${domla}`)
          .then((response1) => response1.json())
          .then((res1) => {
            console.log(res1.data.ayahs);
            res1.data.ayahs.forEach((val) => {
              translateText.innerHTML += `${val.text}`;
            });
          });
      });
  }
});
//
//
//
//
//
//
//
//
//
const background = document.querySelector("#background"); // background derived from album cover below
const thumbnail = document.querySelector("#thumbnail"); // album cover
const song = document.querySelector("#song"); // audio object

const songArtist = document.querySelector(".song-artist"); // element where track artist appears
const songTitle = document.querySelector(".song-title"); // element where track title appears
const progressBar = document.querySelector("#progress-bar"); // element where progress bar appears
let pPause = document.querySelector("#play-pause"); // element where play and pause image appears

songIndex = 0;
songs = ["./assets/music/beyonce.mp3", "./assets/music/dontstartnow.mp3"]; // object storing paths for audio objects
thumbnails = [
  "./assets/images/lemonade.png",
  "./assets/images/dontstartnow.png",
]; // object storing paths for album covers and backgrounds
songArtists = ["Beyonce", "Dua Lipa"]; // object storing track artists
songTitles = ["Don't Hurt Yourself", "Don't Start Now"]; // object storing track titles

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
  if (playing) {
    const song = document.querySelector("#song"),
      thumbnail = document.querySelector("#thumbnail");

    pPause.src = "./assets/icons/pause.png";
    thumbnail.style.transform = "scale(1.15)";

    song.play();
    playing = false;
  } else {
    pPause.src = "./assets/icons/play.png";
    thumbnail.style.transform = "scale(1)";

    song.pause();
    playing = true;
  }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener("ended", function () {
  nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track
function nextSong() {
  songIndex++;
  if (songIndex > 1) {
    songIndex = 0;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  background.src = thumbnails[songIndex];

  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 1;
  }
  song.src = songs[songIndex];
  thumbnail.src = thumbnails[songIndex];
  background.src = thumbnails[songIndex];

  songArtist.innerHTML = songArtists[songIndex];
  songTitle.innerHTML = songTitles[songIndex];

  playing = true;
  playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
  document.querySelector(".currentTime").innerHTML = formatTime(
    Math.floor(song.currentTime)
  );
  if (document.querySelector(".durationTime").innerHTML === "NaN:NaN") {
    document.querySelector(".durationTime").innerHTML = "0:00";
  } else {
    document.querySelector(".durationTime").innerHTML = formatTime(
      Math.floor(song.duration)
    );
  }
}

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
  song.currentTime = progressBar.value;
}
