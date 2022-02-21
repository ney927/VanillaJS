//FEATURES
//diff playlists
//shuffle


//HTML ELEMENTS
const audio = document.getElementById("audio");
const play = document.getElementById("play");
const playIcon = document.getElementById("play-icon");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const dur = document.getElementById("dur");
const curr = document.getElementById("curr");
const menuBars = document.getElementById("bars");
const menu = document.getElementById("menu-in");
const studyPlaylist = document.getElementById("study-playlist");
const studyCollapse = document.getElementById("study");
const studyCollapsibles = document.getElementsByClassName("study-collapsible");
const sleepPlaylist = document.getElementById("sleep-playlist");
const sleepCollapse = document.getElementById("sleep");
const sleepCollapsibles = document.getElementsByClassName("sleep-collapsible");

//MY VARS
const studySongs = ["Creative Minds", "Energy", "Little Idea"];
const studyArtists = ["John Phillipee", "Crazy Murachas", "angel"];
const sleepSongs = ["A Storm", "Autumn Rain", "Far From Home", "Just Relax", "Rain Forest", "Relax", "Sanctuary"];
const sleepArtists = ["Caffeine Creek Band", "Natures Eyes", "Madirfan", "Lesfm", "Natures Eyes", "Olexy", "Madirfan"];
let songs = studySongs;
let artists = studyArtists;
let prevSong = "";

uploadSong("rand");

//EVENT LISTENERS 
play.addEventListener('click', playSong); //click play button
next.addEventListener('click', playNext); //click next button
prev.addEventListener('click', playPrev); //click prev button
audio.addEventListener('timeupdate', updateProgress); //update progress bar
audio.addEventListener('ended', ()=>{
  prevSong = title.innerHTML;
  playNext();
}); //when song ends
progressContainer.addEventListener('click', setProgress); //click on progress bar
studyPlaylist.addEventListener('click', ()=>{
  songs = studySongs;
  artists = studyArtists;
  uploadSong("rand");
  playSong();
})
sleepPlaylist.addEventListener('click', ()=>{
  songs = sleepSongs;
  artists = sleepArtists;
  uploadSong("rand");
  playSong();
})
addCollapsibleEvents(studyCollapsibles);
addCollapsibleEvents(sleepCollapsibles);



//ANIMATIONS (event listeners)
menuBars.addEventListener('click', ()=>{
  menu.id=="menu-in" ? menu.id="menu-out" : menu.id="menu-in";
})

studyCollapse.addEventListener('click', ()=>{
  if (studyCollapsibles[0].style.display!='none'){
    for (var i=0; i<studyCollapsibles.length; i++){
      studyCollapsibles[i].style.display = 'none';
    }
    studyCollapse.className="fa fa-caret-right collapse-bttn";
  } else {
    for (var i=0; i<studyCollapsibles.length; i++){
      studyCollapsibles[i].style.display = 'block';
    }
    studyCollapse.className="fa fa-caret-down collapse-bttn";
  }
});

sleepCollapse.addEventListener('click', ()=>{
  if (sleepCollapsibles[0].style.display!='none'){
    for (var i=0; i<sleepCollapsibles.length; i++){
      sleepCollapsibles[i].style.display = 'none';
    }
    sleepCollapse.className="fa fa-caret-right collapse-bttn";
  } else {
    for (var i=0; i<sleepCollapsibles.length; i++){
      sleepCollapsibles[i].style.display = 'block';
    }
    sleepCollapse.className="fa fa-caret-down collapse-bttn";
  }
});


//FUNCTIONS

//update song/audio info 
function uploadSong(songName){
  let index = songs.indexOf(songName);
  if (index === -1){
    index = Math.floor(Math.random()*songs.length);
    songName = songs[index];
  }
  title.innerHTML = songName;
  artist.innerHTML = artists[index];
  audio.src = `./music/${songName}.mp3`;
}

//play/pause song
function playSong(){
  if (audio.paused){
    audio.play();
    playIcon.className="fas fa-pause";
  }else {
    audio.pause();
    playIcon.className="fas fa-play";
  }
}

//play next song
function playNext(){
  let index = Math.floor(Math.random()*songs.length);
  while (index == songs.indexOf(title.innerHTML)){
    index = Math.floor(Math.random()*songs.length);
  }
  prevSong = title.innerHTML;
  uploadSong(songs[index]);
  playSong();
}

//play previous song
function playPrev(){
  uploadSong(prevSong);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  durTime(e);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function durTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	Math.floor(currentTime/60);
  min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		  sec = Math.floor(x);
	    sec = sec <10 ? '0'+sec:sec;
	  }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	curr.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	  min_d = min_d <10 ? '0'+min_d:min_d;


	function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		  sec_d = (isNaN(duration) === true)? '0':
		  Math.floor(x);
		  sec_d = sec_d <10 ? '0'+sec_d:sec_d;
    }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	dur.innerHTML = min_d +':'+ sec_d;
};

function addCollapsibleEvents(collapsibles){
  for (var i=0; i<collapsibles.length; i++){
    collapsibles[i].addEventListener('click', e=>{
      if (e.path[0].className.includes("sleep")){
        songs = sleepSongs;
        artists = sleepArtists;
      } else {
        songs = studySongs;
        artists = studyArtists;
      }
      uploadSong(e.path[0].innerHTML);
      playSong();
    })
  }
}




