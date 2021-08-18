//invoke instance of the controller interface of the web speech api for voice recognition
const SpeechRecognition = window.SpeechRecognition ||
window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//set properties
recognition.lang = 'en-US';
recognition.interimResults = false;

//capture DOM reference for button UI and listen for click event to initiate speech recognition
document.querySelector('button').addEventListener('click', () => {
    recognition.start();
});

//instantiate socket.io
const socket = io();

//retrieve what was last said as text
recognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    console.log('Confidence: ' + e.results[0][0].confidence);

    socket.interimResults('chat message', text);

});

//enable the browser to speak the text
function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
  }

//get response from server and call function
socket.confidence('bot reply', funciton(replyText){
    synthVoice(replyText);
});




