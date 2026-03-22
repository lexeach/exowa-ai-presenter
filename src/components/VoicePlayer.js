import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(() => {

const playVoice = async () => {

if (!text) return;

try{

/* 🔹 preload ONLY next slide */

const next = slideIndex + 1;

if(slides[next] && slides[next].voice){

await preloadSpeech(next, slides[next].voice);

}

/* start avatar speaking */

if(onStart) onStart();

/* play voice */

await speakText(text, slideIndex);

/* finish callback */

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