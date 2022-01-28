//VARIABLES
let scores = [];
let cnt = 0;
let num = Math.floor((Math.random()*100+1));
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.continuous = true;
//get html elements
const guess = document.getElementById('guess');
const direction = document.getElementById('direction');
const instruction = document.getElementById('instruction');
const game = document.getElementById('game');
const gameOver = document.getElementById('hide');
const playAgain = document.getElementById('playAgain');
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');


// recognition.addEventListener('results', () => console.log('result'));
recognition.onstart = function() {
  console.log("start");
  console.log("Total: "+cnt);
  console.log("Num: "+num);
};

recognition.onresult = function(e) {
  results = parseInt(e.results[e.results.length-1][0].transcript)
  if (results) {
    guess.innerHTML = results
    cnt++;
    checkGuess(results);
  } 
};

recognition.onend = function() {
  console.log("end");
};

// start recognition
recognition.start();

playAgain.addEventListener('click', ()=>{
  resetGame();
})

function checkGuess(results){
  results == num ? win() : direction.innerHTML = results > num ? "GO LOWER" : "GO HIGHER";
}

function win(){
  game.id = "hide";
  gameOver.id = "game-Over";
  console.log("won");
  recognition.stop();
  score.innerHTML = `It took you ${cnt} guesses!`;
  scores.push(cnt);
  cnt = 0;
  console.log(scores);
  highScore.innerHTML = "Your high score is " +Math.min(...scores);
}

function resetGame(){
  recognition.start();
  gameOver.id = "hide";
  game.id = "game";
  guess.innerHTML = "___";
  direction.innerHTML = "LETS GET STARTED!";
  num = Math.floor((Math.random()*100+1));
}

