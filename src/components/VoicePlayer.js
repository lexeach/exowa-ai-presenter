import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(() => {

const playVoice = async () => {

if (!text) return;

try{

/* START AVATAR SPEAKING */

if(onStart) onStart();

/* PLAY CURRENT SLIDE VOICE */

await speakText(text, slideIndex);

/* FINISH CALLBACK */

if(onFinish) onFinish();

/* PRELOAD NEXT SLIDE VOICE */

const nextSlide = slideIndex + 1;

if(slides[nextSlide] && slides[nextSlide].voice){

preloadSpeech(nextSlide, slides[nextSlide].voice);

}

}catch(error){

console.error("VoicePlayer error:",error);

}

};

playVoice();

}, [text]);

return null;

}

export default VoicePlayer;