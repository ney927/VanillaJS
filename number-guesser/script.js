//VARIABLES
const num = Math.floor((Math.random()*100+1));
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.continuous = true;
//get html elements
const guess = document.getElementById('guess');
const direction = document.getElementById('direction');
const instruction = document.getElementById('instruction');


// recognition.addEventListener('results', () => console.log('result'));
recognition.onstart = function() {
  console.log("start");
};

recognition.onresult = function() {
  console.log("spoke");
};

recognition.onend = function() {
  console.log("end");
};

// start recognition
recognition.start();

