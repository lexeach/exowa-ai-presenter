// Supported languages
export const languageOptions = [

{ label: "English", code: "en-US" },
{ label: "Hindi", code: "hi-IN" },
{ label: "Tamil", code: "ta-IN" },
{ label: "Telugu", code: "te-IN" },
{ label: "Kannada", code: "kn-IN" }

];

export function speakText(text, language = "hi-IN") {

if (!text) return;

const speech = new SpeechSynthesisUtterance(text);

speech.lang = language;
speech.rate = 0.9;
speech.pitch = 1;

const voices = window.speechSynthesis.getVoices();

// find matching language voice
const selectedVoice = voices.find(v => v.lang === language);

if (selectedVoice) {
speech.voice = selectedVoice;
}

window.speechSynthesis.cancel();
window.speechSynthesis.speak(speech);

}