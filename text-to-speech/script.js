//VARIABLES

//get html elements
const customBttn = document.getElementById('bttn-custom');
const customBox = document.getElementById('box-custom-hide');
const closeCustom = document.getElementById('close-custom');
const customText = document.getElementById('custom-text');
const speakText = document.getElementById('speak-custom');
const voicesSelect = document.getElementById('voices-select')
const imagesArray = document.getElementsByClassName('bttn-img');

//other varibles
const synth = window.speechSynthesis;
const textArray = Object.values(imagesArray);
let utterThis = new SpeechSynthesisUtterance(customText.value);


//codes
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}


//EVENT LISTENERS

//images speak when clicked
textArray.forEach((img) => {
  img.addEventListener('click', e => {
    let src = e.srcElement.src;
    let descrip =  src.substring(src.lastIndexOf('/') + 1, src.indexOf('.jpg'));
    utterThis.text = descrip;
    synth.speak(utterThis);
  })
})

//custom text box opens when button is clicked
customBttn.addEventListener('click', e => {
  customBox.id = 'box-custom';
})

//close custom text box when you click the x in the corner
closeCustom.addEventListener('click', e => {
  customBox.id = 'box-custom-hide';
  customText.value = "";
  utterThis.voice = getVoice();
})

//speak custom text when Speak button is clicked
speakText.addEventListener('click', e => {
  utterThis.text = customText.value;
  utterThis.voice = getVoice();
  synth.speak(utterThis);
})


//FUNCTIONS

//add options will all possible voices for synth
function populateVoiceList(){
  let voices = synth.getVoices()
  for(let i=0; i<voices.length; i++){
    let option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);

    voicesSelect.appendChild(option);
  }
}

function getVoice(){
  let voices = synth.getVoices()
  let selectedOption = voicesSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      return voices[i];
    }
  }
  return voices[0];
}




