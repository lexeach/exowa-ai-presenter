// Supported language list
export const languageOptions = [

{ label: "English", code: "en-US" },
{ label: "Hindi", code: "hi-IN" },
{ label: "Tamil", code: "ta-IN" },
{ label: "Telugu", code: "te-IN" },
{ label: "Kannada", code: "kn-IN" },
{ label: "Malayalam", code: "ml-IN" },
{ label: "Bengali", code: "bn-IN" }

];


// Speak text using selected language
export function speakText(text, language = "en-US") {

if(!text) return;

const speech = new SpeechSynthesisUtterance(text);

speech.lang = language;
speech.rate = 0.9;
speech.pitch = 1;

window.speechSynthesis.cancel();
window.speechSynthesis.speak(speech);

}


// Start voice recognition
export function startVoiceRecognition(language, callback) {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Voice recognition not supported in this browser");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = language;
recognition.continuous = false;
recognition.interimResults = false;

recognition.start();

recognition.onresult = function(event){

const text = event.results[0][0].transcript;

callback(text);

};

recognition.onerror = function(err){
console.error("Voice recognition error", err);
};

}