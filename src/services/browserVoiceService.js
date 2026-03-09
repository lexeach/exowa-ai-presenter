export function speakSlide(text){

return new Promise(resolve => {

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "hi-IN";
speech.rate = 0.9;

speech.onend = resolve;

window.speechSynthesis.cancel();
window.speechSynthesis.speak(speech);

});

}