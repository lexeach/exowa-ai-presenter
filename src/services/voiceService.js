export function speakText(text, onEnd){

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "hi-IN";
speech.rate = 0.9;

speech.onend = () => {
  if(onEnd){
    onEnd();
  }
};

window.speechSynthesis.cancel();
window.speechSynthesis.speak(speech);

}