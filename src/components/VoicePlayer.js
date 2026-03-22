import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(() => {

const playVoice = async () => {

if (!text) return;

try{

/* preload next slide */

const nextSlide = slideIndex + 1;

if(slides[nextSlide] && slides[nextSlide].voice){
preloadSpeech(nextSlide, slides[nextSlide].voice);
}

/* wait for slide render */

await new Promise(resolve => requestAnimationFrame(resolve));

/* start avatar speaking */

if(onStart) onStart();

/* play voice */

await speakText(text, slideIndex);

/* finish */

if(onFinish) onFinish();

}catch(e){
console.error("VoicePlayer error:",e);
}

};

playVoice();

}, [slideIndex]);

return null;
}

export default VoicePlayer;