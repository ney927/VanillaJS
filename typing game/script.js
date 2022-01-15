//VARIABLES

//get elements from html
settings = document.getElementById('settings');
difficulty = document.getElementById('difficulty');
timer = document.getElementById('timer');
score = document.getElementById('score');
word = document.getElementById('word');
typed = document.getElementById('typed');
gameDiv = document.getElementById('game');
endGameDiv = document.getElementById('hidden');
finalScore = document.getElementById('finalScore');
reload = document.getElementById('reload');

//define other variables
let scoreVal = 0;
let timeLeft = 10;
let showSettings = false;
const words = [ 
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];
//asign first word
assignRandWord(words, word);

// decrease timer on an interval, if timer ends run endGame()
const increaseTimer = setInterval(() => {
  timer.innerHTML = `Timer: ${timeLeft}s` 
  timeLeft < 1 ?  endGame() : timeLeft--;
}, 1000)



//EVENT LISTENERS

//when you type a word
typed.addEventListener('input', e => {
  text = e.target.value; //get typed word
  if (text === word.innerHTML){ //if word is correctly typed
    typedWord(); //call function
  } 
})

// hide difficuty bar at the top when you click the setting buttons
settings.addEventListener('click', () => {
  !showSettings ? difficulty.id = 'difficultyHide' : difficulty.id = 'difficulty';
  showSettings = !showSettings;
})


//FUNCTIONS

//when timer runs out
function endGame() {
  clearInterval(increaseTimer); //stop timer
  gameDiv.id = 'hidden';
  endGameDiv.id = 'game';
  finalScore.innerHTML = `Final Score: ${scoreVal}`
}

//add new random word to HTML element
function assignRandWord(words, word){
  word.innerHTML = words[Math.floor(Math.random()*words.length)];
}

//update random word, score, and timer for when word is correctly typed
function typedWord(){
  assignRandWord(words, word); //new random word
  typed.value = ""; //clear input field
  timeLeft = 10; //reset timer
  increaseScore(); //update score
}

//increases scoreVal variable and displays new score 
function increaseScore(){
  scoreVal++;
  score.innerHTML = `Score: ${scoreVal}`;
}