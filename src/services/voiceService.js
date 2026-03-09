export function speakText(text){

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "en-US";

window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);

}